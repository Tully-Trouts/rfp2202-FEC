/* eslint-disable camelcase */
import React, {Component} from 'react';
import axios from 'axios';
import Question from './Question';
import QASearch from './QASearch';
import QuestionModal from './QuestionModal';
import { Button, Link } from '../styledComponents';

class QA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId, //65631
      questions: [],
      search: '',
      newQuestionBody: '',
      newQuestionNickname: '',
      newQuestionEmail: '',
      isQuestionModalOpen: false,
      toLoad: 4,
      loadingMore: false,
      submitError: false,
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
    this.liftSearch = this.liftSearch.bind(this);
    this.filter = this.filter.bind(this);
    this.liftClear = this.liftClear.bind(this);
    this.handleLoadMoreQuestions = this.handleLoadMoreQuestions.bind(this);

    this.addQuestionClick = this.addQuestionClick.bind(this);
    this.closeAddQuestion = this.closeAddQuestion.bind(this);
    this.handleNewQuestionInput = this.handleNewQuestionInput.bind(this);
    this.handleNicknameInput = this.handleNicknameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleNewQuestionSubmit = this.handleNewQuestionSubmit.bind(this);
    this.handleNewQuestionSubmitError = this.handleNewQuestionSubmitError.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {getQuestionsById, props} = this;
    const {productId} = props;
    if (productId !== prevProps.productId) {
      getQuestionsById(productId);
      this.setState({productId: productId});
    }
  }

  getQuestionsById(productId) {
    if (productId === undefined) {
      var productId = this.state.productId;
    }
    axios.get('/api/qa/questions', {
      params: {
        // eslint-disable-next-line camelcase
        product_id: productId,
        page: 1,
        count: 10000
      }
    })
      .then((response) => {
        this.setState({
          questions: response.data.results
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  liftSearch(search) {
    this.setState({
      search: search
    });
  }

  liftClear() {
    this.setState({
      search: ''
    });
  }

  filter() {
    const {search, questions} = this.state;
    //filter by helpfulness
    questions.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

    //filter by search
    if (!search.length !== 0 && search.length >= 3) {
      return questions.filter((question) => {
        if (question.question_body.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    return questions;
  }

  handleLoadMoreQuestions(e) {
    e.preventDefault();
    // if (e.target.value === 'loadMore') {
    //   this.setState({toLoad: this.state.questions.length, loadingMore: true});
    // } else {
    //   this.setState({toLoad: 4, loadingMore: false});
    // }
    if (e.target.value === 'loadMore') {
      this.setState({toLoad: this.state.toLoad + 2, loadingMore: true});
    } else {
      this.setState({toLoad: 4, loadingMore: false});
    }
  }

  addQuestionClick(e) {
    e.preventDefault();
    this.setState({isQuestionModalOpen: true});
  }

  closeAddQuestion(e) {
    e.preventDefault();
    this.setState({
      newQuestionBody: '',
      newQuestionNickname: '',
      newQuestionEmail: '',
      isQuestionModalOpen: false,
    });
  }

  handleNewQuestionInput(e) {
    e.preventDefault;
    this.setState({newQuestionBody: e.target.value});
  }

  handleNicknameInput(e) {
    e.preventDefault();
    this.setState({newQuestionNickname: e.target.value});
  }

  handleEmailInput(e) {
    e.preventDefault();
    this.setState({newQuestionEmail: e.target.value});
  }

  handleNewQuestionSubmit(e) {
    e.preventDefault();
    const {newQuestionBody, newQuestionNickname, newQuestionEmail, productId} = this.state;
    const {getQuestionsById} = this;

    //Check for input formatting:
    const clearForSubmit = true;

    if (clearForSubmit) {
      axios.post('api/qa/questions', {
        body: newQuestionBody,
        name: newQuestionNickname,
        email: newQuestionEmail,
        product_id: productId
      })
        .then((response) => {
          console.log(response.data);
          getQuestionsById(productId);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({
        newQuestionBody: '',
        newQuestionNickname: '',
        newQuestionEmail: '',
        isQuestionModalOpen: false,
      });
    }
  }

  handleNewQuestionSubmitError(e) {
    e.preventDefault();
    this.setState({submitError: true});
  }

  render() {
    const {questions, isQuestionModalOpen, newQuestionBody, newQuestionNickname, newQuestionEmail, toLoad, loadingMore, submitError} = this.state;
    const {liftSearch, liftClear, filter, addQuestionClick, closeAddQuestion, handleNewQuestionInput, handleNicknameInput, handleEmailInput, handleNewQuestionSubmit, handleNewQuestionSubmitError, handleLoadMoreQuestions, getQuestionsById} = this;
    const {product} = this.props;

    let loadMoreButton;
    if (questions.length > toLoad) {
      loadMoreButton = <Button className={'More_Qs'} size={1} value='loadMore' onClick={handleLoadMoreQuestions}>Load More Questions</Button>;
    } else if (questions.length > 4 && questions.length <= toLoad) {
      loadMoreButton = <Button className='More_Qs' size={1} value='collapse' onClick={handleLoadMoreQuestions}>Collapse</Button>;
    } else {
      loadMoreButton = <></>;
    }

    return (
      <div id='QA'>
        <h3 id='QA_Title'>Questions and Answers</h3>
        { questions.length === 0
          ?
          <div>No current questions</div>
          :
          <div>
            <QASearch liftSearch={liftSearch} liftClear={liftClear} />
            {/* <div className={loadingMore ? 'Q_List_Overflow' : 'Q_List'}> */}
            <div className='Q_List'>
              {filter().slice(0, toLoad).map((question) =>
                <Question getQuestionsById={getQuestionsById} question={question} key={question.question_id} product={product}/>
              )}
            </div>
          </div>
        }

        {loadMoreButton}

        <Button className='Add_Question' onClick={addQuestionClick} size={1}>Add A Question +</Button>
        <QuestionModal open={isQuestionModalOpen} onClose={closeAddQuestion}>
          <form>
            <h3 className='New_QA_Form_Header'>Ask Your Question Here</h3>
            <h4 className='New_QA_Form_Sub_Header'>about the {product.name}</h4>
            <div>
              <label>Enter Question: </label>
              <textarea className={newQuestionBody.length <= 0 ? 'New_QA_Input_Error' : ''} value={newQuestionBody} placeholder='Your Question' maxLength={1000} onChange={handleNewQuestionInput} rows='10' cols='100' />
            </div>

            <div className='Flex_New_QA_Submit'>

              <div className='Flex_Nickname_Email'>
                <div>
                  <label>Enter Nickname: </label>
                  <textarea className={newQuestionNickname.length <= 0 ? 'New_QA_Nickname_Input_Error' : ''} value={newQuestionNickname} placeholder='Example: jack543!' maxLength={60} onChange={handleNicknameInput} rows='1' cols='60' />
                </div>
                <span>
                  <label>Enter Email: </label>
                  <textarea className={newQuestionEmail.length <= 0 ? 'New_QA_Email_Input_Error' : ''} value={newQuestionEmail} placeholder='Example: jack@email.com' maxLength={60} onChange={handleEmailInput} rows='1' cols='60' />
                </span>
              </div>

              <div>
                <Button size={1} onClick={ handleNewQuestionSubmit}>Submit Your Question</Button>
              </div>
            </div>

          </form>
        </QuestionModal>
      </div>
    );
  }
}

export default QA;
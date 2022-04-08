import React, {Component} from 'react';
import axios from 'axios';
import QList from './QList';
import QASearch from './QASearch';
import QuestionModal from './QuestionModal';

class QA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 65631, //this.props.productId,
      questions: [],
      search: '',
      newQuestionBody: '',
      newQuestionNickname: '',
      newQuestionEmail: '',
      isQuestionModalOpen: false,
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
    this.liftSearch = this.liftSearch.bind(this);
    this.filter = this.filter.bind(this);
    this.liftClear = this.liftClear.bind(this);

    this.addQuestionClick = this.addQuestionClick.bind(this);
    this.closeAddQuestion = this.closeAddQuestion.bind(this);
    this.handleNewQuestionInput = this.handleNewQuestionInput.bind(this);
    this.handleNicknameInput = this.handleNicknameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleNewQuestionSubmit = this.handleNewQuestionSubmit.bind(this);
  }

  componentDidMount() {
    this.getQuestionsById(this.state.productId);
  }

  componentDidUpdate(prevProps) {
    const {getQuestionsById, props} = this;
    const {productId} = props;

    if (productId !== prevProps.productId) {
      getQuestionsById(productId);
    }
  }

  getQuestionsById(productId) {
    axios.get('/api/qa/questions/', {
      params: {
        // eslint-disable-next-line camelcase
        product_id: productId,
        page: 1,
        count: 10000
      },
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

  addQuestionClick(e) {
    e.preventDefault();
    this.setState({isQuestionModalOpen: true});
  }

  closeAddQuestion(e) {
    e.preventDefault();
    this.setState({isQuestionModalOpen: false});
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
  }

  render() {
    const {questions, isQuestionModalOpen, newQuestionBody, newQuestionNickname, newQuestionEmail} = this.state;
    const {liftSearch, liftClear, filter, addQuestionClick, closeAddQuestion, handleNewQuestionInput, handleNicknameInput, handleEmailInput, handleNewQuestionSubmit} = this;
    const {product} = this.props;

    return (
      <div className='QA'>
        <h3 className='QA_Title'>Questions and Answers</h3>
        { questions.length === 0
          ?
          <div>No current questions</div>
          :
          <div>
            <QASearch liftSearch={liftSearch} liftClear={liftClear} />
            <QList questions={filter()} product={product}/>
          </div>
        }

        <button className='Add_Q' onClick={addQuestionClick}>Add A Question +</button>
        <QuestionModal open={isQuestionModalOpen} onClose={closeAddQuestion}>
          <form onSubmit={handleNewQuestionSubmit}>
            <h3>Ask Your Question</h3>
            <h4>About the {product.name} here</h4>
            <div>
              <label>Enter Question: </label>
              <textarea value={newQuestionBody} placeholder='Your Question' onChange={handleNewQuestionInput} rows='10' cols='100' />
            </div>
            <div>
              <label>Enter Nickname: </label>
              <textarea value={newQuestionNickname} placeholder='Example: jackson11!' onChange={handleNicknameInput} rows='1' cols='40' />
            </div>
            <span>
              <label>Enter Email: </label>
              <textarea value={newQuestionEmail} placeholder='Example: jack@email.com' onChange={handleEmailInput} rows='1' cols='40' />
            </span>
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </QuestionModal>
      </div>
    );
  }
}

export default QA;
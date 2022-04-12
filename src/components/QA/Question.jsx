/* eslint-disable camelcase */
import React, {Component} from 'react';
import AList from './AList';
import AnswerModal from './AnswerModal';
import AnswerImagesModal from './AnswerImagesModal';
import ReactDOM from 'react-dom';
import { Button, Link } from '../styledComponents';
import axios from 'axios';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // answers: [],
      isAnswerModalOpen: false,
      newAnsBody: '',
      newAnsNickname: '',
      newAnsEmail: '',
      newAnswerPhotos: [],
      questionId: this.props.question.question_id,
      update: '',
      imageURL: '',
    };

    this.addAnsClick = this.addAnsClick.bind(this);
    this.closeAddAns = this.closeAddAns.bind(this);
    this.handleNewAnswerInput = this.handleNewAnswerInput.bind(this);
    this.handleNicknameInput = this.handleNicknameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleNewAnsSubmit = this.handleNewAnsSubmit.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleAddImages = this.handleAddImages.bind(this);
    this.closeAddImages = this.closeAddImages.bind(this);
    this.handleImageURL = this.handleImageURL.bind(this);
    this.handeImageSubmit = this.handeImageSubmit.bind(this);
    // this.getAllAnswers = this.getAllAnswers.bind(this);
  }

  // componentDidMount() {
  //   console.log('QUESTION ID === ', this.props.question.question_id);
  //   this.getAllAnswers(this.props.question.question_id);
  // }

  // getAllAnswers(questionId) {
  //   //GET /qa/questions/:question_id/answers
  //   console.log(`/api/qa/questions/${questionId}/answers`);
  //   axios.get(`/api/qa/questions/${questionId}/answers`, {
  //     params: {
  //       page: 10000,
  //       count: 1
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       this.setState({
  //         answers: response.data.results
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  addAnsClick(e) {
    e.preventDefault();
    this.setState({isAnswerModalOpen: true});
  }

  closeAddAns(e) {
    e.preventDefault();
    this.setState({
      newAnsBody: '',
      newAnsNickname: '',
      newAnsEmail: '',
      newAnswerPhotos: [],
      isAnswerModalOpen: false,
    });
  }

  handleNewAnswerInput(e) {
    e.preventDefault;
    this.setState({newAnsBody: e.target.value});
  }

  handleNicknameInput(e) {
    e.preventDefault();
    this.setState({newAnsNickname: e.target.value});
  }

  handleEmailInput(e) {
    e.preventDefault();
    this.setState({newAnsEmail: e.target.value});
  }

  handleNewAnsSubmit(e) {
    e.preventDefault();
    const {newAnsBody, newAnsNickname, newAnsEmail, newAnswerPhotos, questionId} = this.state;
    const {getQuestionsById} = this.props;

    console.log(newAnsBody, newAnsNickname, newAnsEmail, newAnswerPhotos, questionId);
    console.log(`api/qa/questions/${questionId}/answers`);

    axios.post(`api/qa/questions/${questionId}/answers`, {
      body: newAnsBody,
      name: newAnsNickname,
      email: newAnsEmail,
      photos: newAnswerPhotos,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      newAnsBody: '',
      newAnsNickname: '',
      newAnsEmail: '',
      newAnswerPhotos: [],
      isAnswerModalOpen: false,
      isImagesModalOpen: false,
    });
    getQuestionsById();
  }

  handleHelpful(e) {
    e.preventDefault();
    const {questionId} = this.state;
    const {getQuestionsById} = this.props;
    axios.put(`api/qa/questions/${questionId}/helpful`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    getQuestionsById();
  }

  handleAddImages() {
    this.setState({isImagesModalOpen: true});
  }

  closeAddImages(e) {
    e.preventDefault();
    this.setState({isImagesModalOpen: false, imageURL: ''});
  }

  handleImageURL(e) {
    e.preventDefault();
    this.setState({imageURL: e.target.value});
  }

  handeImageSubmit(e) {
    e.preventDefault();
    const {newAnswerPhotos, imageURL} = this.state;
    const photos = newAnswerPhotos.slice();
    photos.push(imageURL);
    this.setState({
      newAnswerPhotos: photos,
      imageURL: '',
      isImagesModalOpen: false,
    });
  }

  render() {
    const {question, product, getQuestionsById} = this.props;
    const {question_body, question_helpfulness, answers} = question;
    const {addAnsClick, closeAddAns, handleNewAnswerInput, handleNicknameInput, handleEmailInput, handleNewAnsSubmit, handleHelpful, handleAddImages, closeAddImages, handleImageURL, handeImageSubmit} = this;
    const {isAnswerModalOpen, newAnsBody, newAnsNickname, newAnsEmail, isImagesModalOpen, newAnswerPhotos} = this.state;

    return (
      <div className='Question'>
        <span className='Q'>Q: </span>

        {question_body}

        <span className='Q_Helpful'>
          Helpful?{' '}
          <Link onClick={handleHelpful}>Yes</Link>
          {` (${question_helpfulness}) | `}
          <Link onClick={addAnsClick}>Add Answer</Link>
        </span>

        <AnswerModal open={isAnswerModalOpen} onClose={closeAddAns}>
          <form>
            <h3 className='New_QA_Form_Header'>Submit Your Answer</h3>
            <h4 className='New_QA_Form_Sub_Header'>{product.name} : {question_body}</h4>
            <div>
              <label>Enter Answer: </label>
              <textarea className={newAnsBody.length === 0 ? 'New_QA_Input_Error' : ''} value={newAnsBody} placeholder='Your Answer' onChange={handleNewAnswerInput} rows='10' cols='100' />
            </div>
            <div>
              <label>Enter Nickname: </label>
              <textarea className={newAnsNickname.length === 0 ? 'New_QA_Nickname_Input_Error' : ''} value={newAnsNickname} placeholder='Example: jack543!' onChange={handleNicknameInput} rows='1' cols='40' />
            </div>
            <span>
              <label>Enter Email: </label>
              <textarea className={newAnsEmail.length === 0 ? 'New_QA_Email_Input_Error' : ''} value={newAnsEmail} placeholder='Example: jack@email.com' onChange={handleEmailInput} rows='1' cols='40' />
            </span>

            <div>
              <Button size={1} onClick={handleAddImages}>Add Images</Button>
            </div>
            <div>
              <Button size={1} onClick={handleNewAnsSubmit}>Submit</Button>
            </div>

            <div className='New_Ans_Images'>
              {newAnswerPhotos.length > 0
                ?
                newAnswerPhotos.map((URL) => <img className='New_Answer_Image' src={URL} />)
                :
                <></>
              }
            </div>
          </form>
        </AnswerModal>

        <AnswerImagesModal open={isImagesModalOpen} onClose={closeAddImages}>
          <div>
            <h4>Insert Image URL:</h4>
            <textarea row='2' cols='70' onChange={handleImageURL} />
            <Button size={1} onClick={handeImageSubmit}>Enter</Button>
          </div>
        </AnswerImagesModal>

        <AList getQuestionsById={getQuestionsById} answers={answers} questionBody={question_body} product={product}/>
      </div>
    );
  }
}

export default Question;
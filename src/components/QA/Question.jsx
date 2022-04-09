/* eslint-disable camelcase */
import React, {Component} from 'react';
import AList from './AList';
import AnswerModal from './AnswerModal';
import ReactDOM from 'react-dom';
import { Button, Link } from '../styledComponents';
import axios from 'axios';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswerModalOpen: false,
      newAnsBody: '',
      newAnsNickname: '',
      newAnsEmail: '',
      newAnswerPhotos: [],
      questionId: this.props.question.question_id,
      update: '',
    };

    this.addAnsClick = this.addAnsClick.bind(this);
    this.closeAddAns = this.closeAddAns.bind(this);
    this.handleNewAnswerInput = this.handleNewAnswerInput.bind(this);
    this.handleNicknameInput = this.handleNicknameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleNewAnsSubmit = this.handleNewAnsSubmit.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
  }

  addAnsClick(e) {
    e.preventDefault();
    this.setState({isAnswerModalOpen: true});
  }

  closeAddAns(e) {
    e.preventDefault();
    this.setState({isAnswerModalOpen: false});
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

    console.log(newAnsBody, newAnsNickname, newAnsEmail, newAnswerPhotos, questionId);
    console.log(`api/qa/questions/${questionId}/answers`);

    axios.post(`api/qa/questions/${questionId}/answers`, {
      data: {
        body: newAnsBody,
        name: newAnsNickname,
        email: newAnsEmail,
        photos: newAnswerPhotos,
      },
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
    });
  }

  handleHelpful(e) {
    e.preventDefault();
    const {questionId} = this.state;
    axios.put(`api/qa/questions/${questionId}/helpful`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {question, product} = this.props;
    const {question_body, question_helpfulness, answers} = question;
    const {addAnsClick, closeAddAns, handleNewAnswerInput, handleNicknameInput, handleEmailInput, handleNewAnsSubmit, handleHelpful} = this;
    const {isAnswerModalOpen, newAnsBody, newAnsNickname, newAnsEmail} = this.state;

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
          <form onSubmit={handleNewAnsSubmit}>
            <h3>Submit Your Answer</h3>
            <h4>{product.name} : {question_body}</h4>
            <div>
              <label>Enter Answer: </label>
              <textarea value={newAnsBody} placeholder='Your Answer' onChange={handleNewAnswerInput} rows='10' cols='100' />
            </div>
            <div>
              <label>Enter Nickname: </label>
              <textarea value={newAnsNickname} placeholder='Example: jack543!' onChange={handleNicknameInput} rows='1' cols='40' />
            </div>
            <span>
              <label>Enter Email: </label>
              <textarea value={newAnsEmail} placeholder='Example: jack@email.com' onChange={handleEmailInput} rows='1' cols='40' />
            </span>
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </AnswerModal>

        <AList answers={answers} questionBody={question_body} product={product}/>
      </div>
    );
  }
}

export default Question;
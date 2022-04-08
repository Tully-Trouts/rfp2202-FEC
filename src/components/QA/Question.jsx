/* eslint-disable camelcase */
import React, {Component} from 'react';
import AList from './AList';
import AnswerModal from './AnswerModal';
import ReactDOM from 'react-dom';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswerModalOpen: false,
      newAnsBody: '',
      newAnsNickname: '',
      newAnsEmail: ''
    };

    this.addAnsClick = this.addAnsClick.bind(this);
    this.closeAddAns = this.closeAddAns.bind(this);
    this.handleNewAnswerInput = this.handleNewAnswerInput.bind(this);
    this.handleNicknameInput = this.handleNicknameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleNewAnsSubmit = this.handleNewAnsSubmit.bind(this);
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
  }

  render() {
    const {question, product} = this.props;
    const {question_body, question_helpfulness, answers} = question;
    const {addAnsClick, closeAddAns, handleNewAnswerInput, handleNicknameInput, handleEmailInput, handleNewAnsSubmit} = this;
    const {isAnswerModalOpen, newAnsBody, newAnsNickname, newAnsEmail} = this.state;

    return (
      <div className='Question'>
        <span className='Q'>Q: </span>

        {question_body}

        <span className='Q_Helpful'>
          helpful?
          <button>yes</button>
          {` (${question_helpfulness})`}
        </span>
        <span>
          <button className='Add_A' onClick={addAnsClick}>Add Answer +</button>
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
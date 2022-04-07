import React, {Component} from 'react';
import Answer from './Answer';
import AnswerModal from './AnswerModal';
import ReactDOM from 'react-dom';

class AList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoad: 2,
      loadingMore: false,
      isAnswerModalOpen: false,
      newAnsBody: '',
      newAnsNickname: '',
      newAnsEmail: ''
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.addAnsClick = this.addAnsClick.bind(this);
    this.closeAddAns = this.closeAddAns.bind(this);
    this.handleNewAnswerInput = this.handleNewAnswerInput.bind(this);
    this.handleNicknameInput = this.handleNicknameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleNewAnsSubmit = this.handleNewAnsSubmit.bind(this);
  }

  handleLoadMore(e) {
    e.preventDefault();
    if (e.target.value === 'loadAll') {
      this.setState({toLoad: Object.keys(this.props.answers).length, loadingMore: true});
    } else {
      this.setState({toLoad: 2, loadingMore: false});
    }
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
    const {answers, questionBody, product} = this.props;
    const {toLoad, loadingMore, isAnswerModalOpen, newAnsBody, newAnsNickname, newAnsEmail} = this.state;
    const {handleLoadMore, addAnsClick, closeAddAns, handleNewAnswerInput, handleNicknameInput, handleEmailInput, handleNewAnsSubmit} = this;

    const answerList = [];
    for (let id in answers) {
      answerList.push([id, answers[id]]);
    }
    answerList.sort((a, b) => b[1].helpfulness - a[1].helpfulness);

    let button;
    if (answerList.length > toLoad) {
      button = <button value='loadAll' onClick={handleLoadMore}>Load More Answers</button>;
    } else if (answerList.length > 2 && answerList.length === toLoad) {
      button = <button value='collapse' onClick={handleLoadMore}>Collapse</button>;
    } else {
      button = <></>;
    }

    return (
      <div className={loadingMore ? 'A_List_Overflow' : 'A_List'}>
        <button className='Add_A' onClick={addAnsClick}>Add Answer +</button>

        { answerList.slice(0, toLoad).map((answer) =>
          <Answer answer={answer} key={answer[0]} />
        )}

        {button}

        <AnswerModal open={isAnswerModalOpen} onClose={closeAddAns}>
          <form onSubmit={handleNewAnsSubmit}>
            <h3>Submit Your Answer</h3>
            <h4>{product.name} : {questionBody}</h4>
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
      </div>
    );
  }
}

export default AList;
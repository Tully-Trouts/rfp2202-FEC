import React, {Component} from 'react';
import Answer from './Answer';
import { Button, Link } from '../styledComponents';

class AList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoad: 2,
      loadingMore: false,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore(payload) {
    //e.preventDefault();
    if (payload === 'loadAll') {
      this.setState({toLoad: Object.keys(this.props.answers).length, loadingMore: true});
    } else {
      this.setState({toLoad: 2, loadingMore: false});
    }
  }

  render() {
    const {answers, getQuestionsById} = this.props;
    const {toLoad, loadingMore} = this.state;
    const {handleLoadMore} = this;

    const answerList = [];
    for (let id in answers) {
      answerList.push([id, answers[id]]);
    }
    answerList.sort((a, b) => b[1].helpfulness - a[1].helpfulness);

    let button;
    if (answerList.length > toLoad) {
      button = <Link className={'loadMore'} onClick={() => { handleLoadMore('loadAll'); }}>LOAD MORE ANSWERS</Link>;
    } else if (answerList.length > 2 && answerList.length === toLoad) {
      button = <Link className={'collapse'} onClick={() => { handleLoadMore('collapse'); }}>COLLAPSE</Link>;
    } else {
      button = <></>;
    }

    return (
      <div className={loadingMore ? 'A_List_Overflow' : 'A_List'}>
        { answerList.slice(0, toLoad).map((answer) =>
          <Answer getQuestionsById={getQuestionsById} answer={answer} key={answer[0]} />
        )}
        {button}
      </div>
    );
  }
}

export default AList;
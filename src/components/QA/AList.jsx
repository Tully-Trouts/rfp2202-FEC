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
    const {answers, getAllAnswers} = this.props;
    const {toLoad, loadingMore} = this.state;
    const {handleLoadMore} = this;

    answers.sort((a, b) => b.helpfulness - a.helpfulness);

    let button;
    if (answers.length > toLoad) {
      button = <Link className={'loadMore'} onClick={() => { handleLoadMore('loadAll'); }}>LOAD MORE ANSWERS</Link>;
    } else if (answers.length > 2 && answers.length === toLoad) {
      button = <Link className={'collapse'} onClick={() => { handleLoadMore('collapse'); }}>COLLAPSE</Link>;
    } else {
      button = <></>;
    }

    return (
      <div className={loadingMore ? 'A_List_Overflow' : 'A_List'}>
        { answers.slice(0, toLoad).map((answer) =>
          <Answer questionId={this.props.questionId} getAllAnswers={getAllAnswers} answer={answer} key={answer.answer_id} />
        )}
        {button}
      </div>
    );
  }
}

export default AList;
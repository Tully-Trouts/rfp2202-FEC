import React, {Component} from 'react';
import Answer from './Answer';

class AList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoad: 2,
      loadingMore: false,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore(e) {
    e.preventDefault();
    if (e.target.value === 'loadAll') {
      this.setState({toLoad: Object.keys(this.props.answers).length, loadingMore: true});
    } else {
      this.setState({toLoad: 2, loadingMore: false});
    }
  }

  render() {
    const {answers} = this.props;
    const {toLoad, loadingMore} = this.state;
    const {handleLoadMore} = this;

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
        { answerList.slice(0, toLoad).map((answer) =>
          <Answer answer={answer} key={answer[0]} />
        )}
        {button}
      </div>
    );
  }
}

export default AList;
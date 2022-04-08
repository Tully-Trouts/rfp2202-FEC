import React, {Component} from 'react';
import Question from './Question';

class QList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoad: 4,
    };

    this.handleLoadMoreQuestions = this.handleLoadMoreQuestions.bind(this);
  }

  handleLoadMoreQuestions(e) {
    e.preventDefault();
    if (e.target.value === 'loadMore') {
      this.setState({toLoad: this.state.toLoad + 2});
    } else {
      this.setState({toLoad: 4});
    }
  }

  render() {
    const {questions, product} = this.props;
    const {toLoad} = this.state;
    const {handleLoadMoreQuestions} = this;

    let button;
    if (questions.length > toLoad) {
      button = <button className='More_Qs' value='loadMore' onClick={handleLoadMoreQuestions}>Load More Questions</button>;
    } else if (questions.length > 4 && questions.length <= toLoad) {
      button = <button className='More_Qs' value='collapse' onClick={handleLoadMoreQuestions}>Collapse</button>;
    } else {
      button = <></>;
    }

    return (
      <div className='Q_List'>
        {questions.slice(0, toLoad).map((question) =>
          <Question question={question} key={question.question_id} product={product}/>
        )}
        {button}
      </div>
    );
  }
}

export default QList;

import React, {Component} from 'react';
import Question from './Question';

class Question_List extends Component {
  render() {
    const {questions} = this.props;

    return (
      <div className='Question_List'>
        {questions.map((question) =>
          <Question question={question} key={question.question_id} />
        )}
      </div>
    )
  }
}

export default Question_List;

import React, {Component} from 'react';
import Question from './Question';

class Question_List extends Component {
  render() {
    const {questions} = this.props;

    return (
      <div className='Question_list'>
        {questions.map((question) =>
          <Question question={question} key={question.question_id} />
        )}
        <button className='Load_more_qs'>Load More Questions</button>
        <button className='Add_q'>Add A Question +</button>
      </div>
    )
  }
}

export default Question_List;

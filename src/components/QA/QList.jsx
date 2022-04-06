import React, {Component} from 'react';
import Question from './Question';

class QList extends Component {
  render() {
    const {questions} = this.props;
    return (
      <div className='Q_List'>
        {questions.map((question) =>
          <Question question={question} key={question.question_id} />
        )}
        <button className='More_Qs'>Load More Questions</button>
        <button className='Add_Q'>Add A Question +</button>
      </div>
    );
  }
}

export default QList;

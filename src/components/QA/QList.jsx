import React, {Component} from 'react';
import Question from './Question';

class QList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoad: 4,
    };
  }

  render() {
    const {questions} = this.props;
    const {toLoad} = this.state;
    return (
      <div className='Q_List'>
        {questions.slice(0, toLoad).map((question) =>
          <Question question={question} key={question.question_id} />
        )}
      </div>
    );
  }
}

export default QList;

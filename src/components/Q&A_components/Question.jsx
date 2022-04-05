import React, {Component} from 'react';
import Answer_List from './Answer_List';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  render() {
    const {question} = this.props;
    const {question_body, question_helpfulness, answers} = question;
    return (
      <div className='Question'>
        <span className='Q'>Q: </span>
        {question_body}

        <span className='Q_helpful'>
          helpful?
          <button>yes</button>
          {` (${question_helpfulness})`}
        </span>

        <span className='Q_add_answer'>
          <button>
            Add Answer +
          </button>
        </span>

        <Answer_List answers={answers}/>
      </div>
    )
  }
}

export default Question;
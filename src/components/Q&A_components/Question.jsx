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
    const {question_body, answers} = question;
    return (
      <div className='Question'>
        {question_body}
        <Answer_List answers={answers}/>
      </div>
    )
  }
}

export default Question;
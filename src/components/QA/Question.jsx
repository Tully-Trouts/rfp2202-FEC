/* eslint-disable camelcase */
import React, {Component} from 'react';
import AList from './AList';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {question} = this.props;
    const {question_body, question_helpfulness, answers} = question;

    Object.keys(answers).sort((a, b) => { answers[a].helpfulness - answers[b].helpfulness; });

    return (
      <div className='Question'>
        <span className='Q'>Q: </span>

        {question_body}

        <span className='Q_Helpful'>
          helpful?
          <button>yes</button>
          {` (${question_helpfulness})`}
        </span>

        <AList answers={answers}/>
      </div>
    );
  }
}

export default Question;
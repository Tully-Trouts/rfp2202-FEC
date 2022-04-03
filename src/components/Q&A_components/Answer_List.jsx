import React, {Component} from 'react';
import Answer from './Answer';

class Answer_List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {answers} = this.props;

    return (
      <div className='Answer_List'>
        {/* {JSON.stringify(answers)} */}
        {/* {answers.map((answerId) =>
          <Answer key={answerId} answer={answers[answerId]} />
        )} */}
        {/* {if (Object.keys(answers).length === 0) (
          answers.map((question) => <Answer />)
        )} */}
        {/* {
          answers.map((id) =>
            <Answer key={id}/>
          )
        } */}
      </div>
    )
  }
}

export default Answer_List;
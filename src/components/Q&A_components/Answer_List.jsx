import React, {Component} from 'react';
import Answer from './Answer';

class Answer_List extends Component {
  render() {
    const {answers} = this.props;
    return (
      <div className='Answer_List'>
        {
          Object.keys(answers).map((id) =>
            <Answer answer={answers[id]} key={id}/>
          )
        }
      </div>
    )
  }
}

export default Answer_List;
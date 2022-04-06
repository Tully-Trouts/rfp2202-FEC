import React, {Component} from 'react';
import Answer from './Answer';

class AList extends Component {
  render() {
    const {answers} = this.props;
    return (
      <div className='A_List'>
        {
          Object.keys(answers).map((id) =>
            <Answer answer={answers[id]} key={id}/>
          )
        }
        <button>Load More Answers</button>
      </div>
    );
  }
}

export default AList;
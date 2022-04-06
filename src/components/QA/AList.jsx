import React, {Component} from 'react';
import Answer from './Answer';

class AList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoad: 2,
    };
  }
  render() {
    const {answers} = this.props;
    const {toLoad} = this.state;
    return (
      <div className='A_List'>
        {Object.keys(answers).slice(0, toLoad).map((id) =>
          <Answer answer={answers[id]} key={id}/>
        )}
        <button>Load More Answers</button>
      </div>
    );
  }
}

export default AList;
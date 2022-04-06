import React, {Component} from 'react';
import Answer from './Answer';

class AList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLoad: 2,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (e.target.value === 'loadMore') {
      this.setState({toLoad: this.state.toLoad + 2});
    } else {
      this.setState({toLoad: 0});
    }
  }

  render() {
    const {answers} = this.props;
    const {toLoad} = this.state;
    const {handleClick} = this;

    return (
      <div className='A_List'>
        {Object.keys(answers).slice(0, toLoad).map((id) =>
          <Answer answer={answers[id]} key={id}/>
        )}
        { toLoad - 1 < Object.keys(answers).length
          ?
          <button value='loadMore' onClick={handleClick}>Load More Answers</button>
          :
          <button value='collapse' onClick={handleClick}>Collapse</button>
        }
      </div>
    );
  }
}

export default AList;
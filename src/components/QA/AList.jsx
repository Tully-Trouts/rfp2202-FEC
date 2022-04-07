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

    //convert answers obj of objects to array of obj to sort by helpfulness
    //push tuples of id + answer object to retain information of answer id
    const answerList = [];
    for (let id in answers) {
      answerList.push([id, answers[id]]);
    }
    //sort by order of helpfulness
    answerList.sort((a, b) => {
      a[1].helpfulness - b[1].helpfulness;
    });

    return (
      <div className='A_List'>
        { answerList.slice(0, toLoad).map((answer) =>
          <Answer answer={answer} key={answer[0]} />
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
import React, {Component} from 'react';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {answer} = this.props;
    return (
      <div className='Answer'>
        {answer.body}
      </div>
    )
  }
}

export default Answer;
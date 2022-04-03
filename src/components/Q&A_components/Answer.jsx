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
      <div className='Answer_List'>
        {/* {answer.body} */}
        answer
      </div>
    )
  }
}

export default Answer;
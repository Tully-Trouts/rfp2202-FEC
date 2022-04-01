import React, {Component} from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    // const {question} = this.props;
    return (
      <div>
        {this.props.question.body}
      </div>
    );
  }
}

export default Question;
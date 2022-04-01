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
        {this.props.question}
      </div>
    );
  }
}

export default Question;
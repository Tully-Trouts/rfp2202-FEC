import React, {Component} from 'react';

class Question_List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    console.log(this.props.questionList);
  }

  render() {
    return (
      <div>{JSON.stringify(this.props.questionList)}</div>
    );
  }
}

export default Question_List;

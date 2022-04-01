import React, {Component} from 'react';
import Question from './Question';

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
    // const {questionList} = this.props;
    console.log(questionList)
    return (
      <div className='Question_List'>
        sussy
        {this.props.questionList.map((question) =>
          <Question question={question} />
        )}
      </div>
    );
  }
}

export default Question_List;

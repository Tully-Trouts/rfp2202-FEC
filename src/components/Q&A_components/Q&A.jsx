import React, {Component} from 'react';
import axios from 'axios';
import Question_List from './Question_List';

class QnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
  }

  componentDidMount() {
    this.setState({
      questionsList: this.getQuestionsById(65631)
    });
  }

  getQuestionsById(productId) {
    axios.get('/api/qa/questions/', {
      params: {
        product_id: productId,
      },
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          questionsList: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {questionList} = this.state;
    return (
      <div className='QnA_section'>
        <h3 className='QnA_title'>Questions and Answers</h3>
        <Question_List questionList={questionList}/>
      </div>
    )
  }
}

export default QnA;
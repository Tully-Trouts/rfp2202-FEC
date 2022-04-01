import React, {Component} from 'react';
import axios from 'axios';
import Question_List from './Question_List';

class QnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 65631, //this.props.productId for production phase
      questionList: [{body:'Q1'},{body:'Q2'},{body:'Q3'}]
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
  }

  componentDidMount() {
    // const {getQuestionsById, state} = this;
    // const {questionList} = state;
    // getQuestionsById(questionsList);
  }

  getQuestionsById(productId) {
    axios.get('/api/qa/questions/', {
      params: {
        product_id: productId,
      },
    })
      .then((response) => {
        this.setState({
          questionList: response.data.results
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // const {questionList} = this.state;
    return (
      <div className='QnA_section'>
        <h3 className='QnA_title'>Questions and Answers</h3>
        <Question_List questionList={this.state.questionList}/>
      </div>
    )
  }
}

export default QnA;
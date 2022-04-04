import React, {Component} from 'react';
import axios from 'axios';
import Question_List from './Question_List';
import QnA_Search from './Q&A_Search';

class QnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 65633, //this.props.productId for production phase
      questions: [],
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
  }

  componentDidMount() {
    const {getQuestionsById, state} = this;
    const {productId, questionList} = state
    getQuestionsById(productId);
  }

  getQuestionsById(productId) {
    axios.get('/api/qa/questions/', {
      params: {
        product_id: productId,
      },
    })
      .then((response) => {
        this.setState({
          questions: response.data.results
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {questions} = this.state;
    return (
      <div className='QnA_section'>
        <h3 className='QnA_title'>Questions and Answers</h3>
        <QnA_Search />
        <Question_List questions={questions}/>
      </div>
    )
  }
}

export default QnA;
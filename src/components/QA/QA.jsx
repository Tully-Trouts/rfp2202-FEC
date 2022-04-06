import React, {Component} from 'react';
import axios from 'axios';
import QList from './QList';
import QASearch from './QASearch';

class QA extends Component {
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
    const {productId, questionList} = state;
    getQuestionsById(productId);
  }

  getQuestionsById(productId) {
    axios.get('/api/qa/questions/', {
      params: {
        // eslint-disable-next-line camelcase
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
      <div className='QA'>
        <h3 className='QA_Title'>Questions and Answers</h3>
        <QASearch />
        <QList questions={questions}/>
      </div>
    );
  }
}

export default QA;
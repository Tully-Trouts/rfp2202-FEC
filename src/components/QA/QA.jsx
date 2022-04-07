import React, {Component} from 'react';
import axios from 'axios';
import QList from './QList';
import QASearch from './QASearch';

class QA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      questions: [],
      search: ''
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
    this.liftSearch = this.liftSearch.bind(this);
    this.filter = this.filter.bind(this);
    this.liftClear = this.liftClear.bind(this);
  }

  // componentDidMount() {
  //   this.getQuestionsById(this.state.productId);
  // }

  componentDidUpdate(prevProps) {
    const {getQuestionsById, props} = this;
    const {productId} = props;

    if (productId !== prevProps.productId) {
      getQuestionsById(productId);
    }
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

  liftSearch(search) {
    this.setState({
      search: search
    });
  }

  liftClear() {
    this.setState({
      search: ''
    });
  }

  filter() {
    const {search, questions} = this.state;
    //filter by helpfulness
    questions.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

    //filter by search
    if (!search.length !== 0 && search.length >= 3) {
      return questions.filter((question) => {
        if (question.question_body.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      });
    }
    return questions;
  }

  render() {
    const {questions} = this.state;
    const {liftSearch, liftClear, filter} = this;
    const {product} = this.props;
    return (
      <div className='QA'>
        <h3 className='QA_Title'>Questions and Answers</h3>
        { questions.length === 0
          ?
          <div>No current questions</div>
          :
          <div>
            <QASearch liftSearch={liftSearch} liftClear={liftClear} />
            <QList questions={filter()} product={product}/>
          </div>
        }
        <button className='Add_Q'>Add A Question +</button>
      </div>
    );
  }
}

export default QA;
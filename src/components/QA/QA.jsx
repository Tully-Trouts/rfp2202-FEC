import React, {Component} from 'react';
import axios from 'axios';
import QList from './QList';
import QASearch from './QASearch';

class QA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 65631, //this.props.productId,
      questions: [],
      search: ''
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
    this.liftSearch = this.liftSearch.bind(this);
  }

  componentDidMount() {
    this.getQuestionsById(this.state.productId);
  }

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

  render() {
    const {questions} = this.state;
    const {liftSearch} = this;
    return (
      <div className='QA'>
        <h3 className='QA_Title'>Questions and Answers</h3>
        { questions.length === 0
          ?
          <div> WINDOW WILL BE EMPTY EXCEPT FOR THE ADD QUESTIONS BUTTON IF NO QUESTIONS EXIST <div>CLICK TEST TO RENDER QUESTIONS!</div></div>
          :
          <div>
            <QASearch liftSearch={liftSearch}/>
            <QList questions={questions}/>
          </div>
        }
        <button className='Add_Q'>Add A Question +</button>
      </div>
    );
  }
}

export default QA;
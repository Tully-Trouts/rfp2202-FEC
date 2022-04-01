import React from 'react';
import axios from 'axios';

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
    };

    this.getQuestionsById = this.getQuestionsById.bind(this);
  }

  componentDidMount() {
    this.getQuestionsById(65631);
    console.log(this.getQuestionsById(65631))
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
    return (
      <div className='QnA_section'>
        <h3 className='QnA_title'>Questions and Answers</h3>
        <div></div>
      </div>
    )
  }
}

export default QnA;
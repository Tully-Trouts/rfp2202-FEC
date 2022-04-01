import React from 'react';

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
    };
    this.getQuestionsById = this.getQuestionsById.bind(this);
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
      <div>QUESTIONS AND ANSWERS</div>
    )
  }
}

export default QnA;
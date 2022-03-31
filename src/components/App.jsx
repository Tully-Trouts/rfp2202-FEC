import React from 'react';
import axios from 'axios';
import Overview from './Overview';
import QnA from './Q&A';
import Ratings from './Ratings';
import RelatedItems from './RelatedItems';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      reviewList: [],
      questionsList: [],
      outfit: [],
      cart: [],
    };
    this.getProductById = this.getProductById.bind(this);
    this.getReviewList = this.getReviewList.bind(this);
  }

  getProductById(id) {
    axios.get(`/api/products/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewList(productId) {
    axios.get('/api/reviews/', {
      params: {
        sort: 'relevant',
        product_id: productId,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <label htmlFor="test">Button</label>
        <button type="button" name="test" onClick={()=>{this.getReviewList(65635)}}> TEST! </button>
        <Overview />
        <QnA />
        <Ratings />
        <RelatedItems />
      </div>
    );
  }
}

export default App;

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
      productList: [],
      product: {},
      reviewList: [],
      questionsList: [],
      outfit: [],
      cart: [],
    };
    this.getProductById = this.getProductById.bind(this);
    this.getReviewListById = this.getReviewListById.bind(this);
    this.getQuestionsById = this.getQuestionsById.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
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

  getProductById(id) {
    axios.get(`/api/products/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          product: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewListById(productId) {
    axios.get('/api/reviews/', {
      params: {
        sort: 'relevant',
        product_id: productId,
      },
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          reviewList: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProducts() {
    // dev tool only
    axios.get('/api/products')
      .then((response) => {
        this.setState({
          productList: response.data,
        });
      });
  }

  render() {
    const {
      product,
      questionsList,
      reviewList,
      productList,
    } = this.state;
    return (
      <div>
        <h3>sample products/product IDs for development:</h3>
        <ul>
          {productList.map((element) => (
            <li key={element.id}>
              {`${element.id} - ${element.name}`}
            </li>
          ))}
        </ul>
        <button type="button" name="test" onClick={() => { this.getQuestionsById(65635); }}> TEST! </button>
        <Overview product={product} />
        <QnA questions={questionsList} />
        <Ratings reviews={reviewList} />
        <RelatedItems />
      </div>
    );
  }
}

export default App;

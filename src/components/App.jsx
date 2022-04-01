import React from 'react';
import axios from 'axios';
import Overview from './Overview';
import QnA from './Q&A_components/Q&A';
import Ratings from './Ratings';
import RelatedItems from './RelatedItems';
import Devtool from './Devtool';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      product: {},
      outfit: [],
      cart: [],
    };
    this.getProductById = this.getProductById.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts(); // dev tool only
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
      productList,
    } = this.state;
    return (
      <div>
        <Devtool productList={productList} updateProduct={this.getProductById} />
        <button type="button" name="test" onClick={() => { this.getProductById(65635); }}> TEST! </button>
        <Overview product={product} />
        <QnA productId={product.id} />
        <Ratings productId={product.id} />
        <RelatedItems productId={product.id} />
      </div>
    );
  }
}

export default App;

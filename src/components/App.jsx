import React from 'react';
import axios from 'axios';
import Overview from './overview/Overview';
import QA from './QA/QA';
import Ratings from './Ratings';
import RelatedItems from './relatedItems/RelatedItems';
import OutfitList from './relatedItems/OutfitList';
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

  getProductById(id, event) {
    if (event) {
      event.stopPropagation();
    }
    axios.get(`/api/products/${id}`)
      .then((response) => {
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
        <Overview product={product} />
        <QA productId={product.id} product={product} />
        <Ratings productId={product.id} />
        <RelatedItems getProductById={this.getProductById} product={product} />
        <OutfitList product={product}/>
      </div>
    );
  }
}

export default App;

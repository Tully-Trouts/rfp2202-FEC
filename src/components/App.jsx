import React from 'react';
import axios from 'axios';
import Overview from './overview/Overview';
import QA from './QA/QA_Refactor';
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
  }

  getProductById(id, event) {
    if (event) {
      event.stopPropagation();
    }
    return axios.get(`/api/products/${id}`)
      .then(({data}) => {
        console.log(data);
        this.setState({
          product: data,
        });
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      product,
      productList,
    } = this.state;
    console.log('Check Here', product);
    return (
      <div>
        <Devtool updateProduct={this.getProductById} />
        <div className="app-header">
          <h3><em>Logo</em></h3>
        </div>
        <Overview product={product} />
        <div className="super-app">
          <RelatedItems getProductById={this.getProductById} product={product} />
          <OutfitList product={product}/>
          <QA product={product} />
          <Ratings productId={product.id} productName={product.name}/>
        </div>
        <div className="app-footer">
          <p>Copyright © 2022 Tully-Trouts, Inc.</p>
        </div>
      </div>
    );
  }
}

export default App;

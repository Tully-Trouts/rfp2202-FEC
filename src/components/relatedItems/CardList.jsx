import React from 'react';
import RelatedItems from './RelatedItems';
import Card from './Card';
import axios from 'axios';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItems: []
    };
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }

  getRelatedProducts(productId) {
    console.log('getRelatedProducts triggering');
    axios.get(`api/products/${productId}/related`)
      .then((response) => {
        console.log('response in get related items:::', response);
        this.setState({relatedItems: response.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {

    let { product } = this.props;
    console.log('product in compMount:::', product);

    // FOR DEV: need to pass in full product on App mount
    if (Object.keys(product).length === 0) {
      axios.get(`api/products/${65631}`)
        .then((response) => {
          console.log('response from get product in cardList:::', response);
          product = response.data;
          this.getRelatedProducts(product.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('else statement is triggering');
      this.getRelatedProducts(product.id);
    }

  }

  render() {
    const { relatedItems } = this.state;
    const { product, getProductById } = this.props;
    let uniqueItems = [...new Set(relatedItems)];
    const cardList = uniqueItems.map((productId) => {
      return (
        <div className="card">
          <Card key={productId.toString()} CompProduct={product} productId={productId} getProductById={getProductById}/>
        </div>

      );
    });
    return (
      <>{cardList}</>
    );
  }
}

export default CardList;
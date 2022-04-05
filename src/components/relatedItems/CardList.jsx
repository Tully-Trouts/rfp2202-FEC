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
    if (productId) {
      axios.get(`api/products/${productId}/related`)
        .then((response) => {
          this.setState({relatedItems: response.data});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    this.getRelatedProducts(this.props.product.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.getRelatedProducts(this.props.product.id);
    }
  }

  render() {
    const { relatedItems } = this.state;
    const { product, getProductById } = this.props;
    let uniqueItems = [...new Set(relatedItems)];
    const cardList = uniqueItems.map((productId) => {
      return (
        <div className="card">
          <Card key={productId.toString()} compProduct={product} productId={productId} getProductById={getProductById}/>
        </div>

      );
    });
    return (
      <>{cardList}</>
    );
  }
}

export default CardList;
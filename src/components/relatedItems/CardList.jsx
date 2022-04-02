import React from 'react';
import RelatedItems from './RelatedItems';
import Card from './Card';
import axios from 'axios';

class CardList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('productID in cardlist:::', this.props.productId);
    axios.get(`api/products/${this.props.productId}/related`)
      .then((response) => {
        console.log('response:::', response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    return (
      <div className="card">
        <Card getProductById={this.props.getProductById}/>
      </div>
    );
  }
}

export default CardList;
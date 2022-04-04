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
  }

  componentDidMount() {
    // FOR DEV: need to remove hard coded  productId
    const { productId } = this.props;

    axios.get(`api/products/${productId || 65635}/related`)
      .then((response) => {
        this.setState({relatedItems: response.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    const cardList = this.state.relatedItems.map((productId) => {
      return (
        <div className="card">
          <Card productId={productId} getProductById={this.props.getProductById}/>
        </div>

      );
    });
    return (
      <>{cardList}</>
    );
  }
}

export default CardList;
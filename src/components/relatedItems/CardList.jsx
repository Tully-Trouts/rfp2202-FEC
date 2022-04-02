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
    // this.testRelatedItems = this.testRelatedItems.bind(this);
  }

  // testRelatedItems(id) {
  //   axios.get(`api/products/${id}/related`)
  //     .then((response) => {
  //       console.log('response:::', response);
  //       this.setState({relatedItems: reponse.data});
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  componentDidMount() {
    // FOR DEV: testing with fixed if
    // Need to pass in this.props.productId
    axios.get(`api/products/${65635}/related`)
      .then((response) => {
        console.log('response:::', response);
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
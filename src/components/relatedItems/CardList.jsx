import React from 'react';
import RelatedItems from './RelatedItems';
import Card from './Card';
import axios from 'axios';

const CARDW = 200;

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItems: [],
      firstCard: 0,
      maxCards: 3,
      cardList: []
    };
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }

  getRelatedProducts(productId) {
    if (productId) {
      return axios.get(`api/products/${productId}/related`)
        .then((response) => {
          this.setState({relatedItems: response.data});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  navigate(direction) {
    const containerWidth = document.getElementById('related-items-cards').offsetWidth;
    console.log('Max cards:', Math.floor(containerWidth / CARDW));
    const nextCard = this.state.firstCard + direction;
    this.setState({firstCard: nextCard});
  }

  getCards() {
    console.log('GETTING CARDS');
    const { relatedItems } = this.state;
    const { product, getProductById } = this.props;
    const cardList = relatedItems.map((productId) => {
      return (
        <div className="card" key={productId}>
          <Card isOutfit={false} currProduct={product} productId={productId} getProductById={getProductById}/>
        </div>
      );
    });
    this.setState({cardList});
  }

  componentDidMount() {
    if (this.props.product.id) {
      this.getRelatedProducts(this.props.product.id)
        .then(() => {
          this.getCards();
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      const maxCards = Math.floor(document.getElementById('related-items-cards').offsetWidth / CARDW);
      this.setState({maxCards});
      this.getRelatedProducts(this.props.product.id)
        .then(() => {
          this.getCards();
        });
    }
  }

  render() {
    const lastCard = this.state.firstCard + this.state.maxCards;
    const displayedCards = this.state.cardList.filter((card, index) => (
      index >= this.state.firstCard &&
      index < lastCard
    ));
    return (
      <div id="related-items-cards">
        <nav className="card-list-nav">
          <button
            className="card-nav card-nav-left"
            onClick={()=>{ this.navigate(-1); }}>Left</button>
          <button
            className="card-nav card-nav-right"
            onClick={()=>{ this.navigate(1); }}>Right</button>
        </nav>
        <div className="card-list">
          {displayedCards}
        </div>
      </div>
    );
  }
}

export default CardList;
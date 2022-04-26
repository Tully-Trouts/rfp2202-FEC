import React from 'react';
import RelatedItems from './RelatedItems';
import Card from './Card';
import axios from 'axios';

const CARDW = 201.99;

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
    this.getAvgRating = this.getAvgRating.bind(this);
  }

  getAvgRating(ratings) {
    let sum = 0;
    let totalRatings = 0;
    for (let star in ratings) {
      let count = Number(ratings[star]);
      sum += star * count;
      totalRatings += count;
    }
    let avgRating = Math.round((sum / totalRatings) * 100) / 100;
    return avgRating || 'no reviews yet';
  }

  getAllInfo(productId) {
    return axios.get(`api/products/${productId}`)
      .then((response) => {
        const compProduct = response.data;
        return axios.get(`api/products/${productId}/styles`)
          .then((response) => {
            let results = response.data.results;
            let defaultStyle = null;

            // if the product doesn't have a default style, set default to last style in results
            defaultStyle = results.find((element, index) => element['default?'] || index === (results.length - 1));

            const originalPrice = defaultStyle.original_price;
            const salePrice = defaultStyle.sale_price;

            // the first image in the set will be displayed as the main image
            const previewImg = defaultStyle.photos[0].thumbnail_url;

            return axios.get('api/reviews/meta', {
              params: {
                'product_id': productId,
              }
            })
              .then((response) => {
                let avgRating = this.getAvgRating(response.data.ratings);
                return {
                  compProduct: compProduct,
                  originalPrice: originalPrice,
                  salePrice: salePrice,
                  previewImg: previewImg,
                  avgRating: avgRating,
                };
              })
              .catch((err) => {
                //console.log(err);
              });
          });
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  getRelatedProducts(productId) {
    if (productId) {
      return axios.get(`api/products/${productId}/related`)
        .then((response) => {
          this.setState({relatedItems: response.data});
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }

  navigate(direction) {
    const containerWidth = document.getElementById('related-items-cards').offsetWidth;
    //console.log('Max cards:', Math.floor(containerWidth / CARDW));
    const nextCard = this.state.firstCard + direction;
    this.setState({firstCard: nextCard});
  }

  getCards() {
    //console.log('GETTING CARDS');
    const { relatedItems } = this.state;
    const { product, getProductById } = this.props;
    const uniqueItems = [...new Set(relatedItems)];
    //console.log('uniqueItems:::', uniqueItems);
    const cardList = uniqueItems.filter(productId => productId !== product.id).map((productId) => {
      this.getAllInfo(productId)
        .then((info) => {
          //console.log(info);
          return (
            <div className="card" key={productId}>
              <Card isOutfit={false}
                currProduct={product}
                productId={productId}
                getProductById={getProductById}
                info={info}/>
            </div>
          );
        })
        .then((renderedCard) => {
          this.setState((prevState) => {
            let newList = prevState.cardList;
            newList.push(renderedCard);
            return {cardList: newList};
          });
        });
    });

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
      this.setState({cardList: []});
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
    const leftBound = this.state.firstCard === 0;
    const rightBound = this.state.firstCard + this.state.maxCards >= this.state.cardList.length;
    return (
      <div id="related-items-cards">
        <nav className="card-list-nav">
          <button
            className="card-nav card-nav-left"
            onClick={()=>{ this.navigate(-1); }}
            disabled={leftBound}>Previous</button>
          <button
            className="card-nav card-nav-right"
            onClick={()=>{ this.navigate(1); }}
            disabled={rightBound}>Next</button>
        </nav>
        <div className="card-list">
          {displayedCards}
        </div>
      </div>
    );
  }
}

export default CardList;
import React from 'react';
import axios from 'axios';
import ComparisonModal from './ComparisonModal';
import { Button } from '../styledComponents';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compProduct: {},
      originalPrice: '',
      salePrice: '',
      previewImg: '',
      avgRating: '',
      show: false,
      notFoundUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png'
    };

    this.getAllInfo = this.getAllInfo.bind(this);
    this.getAvgRating = this.getAvgRating.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    this.getAllInfo(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.getAllInfo(this.props.productId);
    }
  }

  handleModalClick() {
    this.setState({show: !this.state.show});
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

  getAllInfo() {
    // naive solution for MVP: need to refactor with Promsie.all() and separate concerns.
    const { productId } = this.props;
    axios.get(`api/products/${productId}`)
      .then((response) => {
        const compProduct = response.data;

        axios.get(`api/products/${productId}/styles`)
          .then((response) => {
            let results = response.data.results;
            var defaultStyle = null;

            // if the product doesn't have a default style, set default to first style in results
            for (let i = 0; i < results.length; i++) {
              if (results['default?'] === true) {
                defaultStyle = results[i];
                break;
              }
              if (i === results.length - 1 && defaultStyle === null) {
                defaultStyle = results[0];
              }
            }
            const originalPrice = defaultStyle.original_price;
            const salePrice = defaultStyle.sale_price;

            // the first image in the set will be displayed as the main image
            const previewImg = defaultStyle.photos[0].thumbnail_url;

            axios.get('api/reviews/meta', {
              params: {
                'product_id': productId,
              }
            })
              .then((response) => {
                let avgRating = this.getAvgRating(response.data.ratings);
                this.setState({
                  compProduct: compProduct,
                  originalPrice: originalPrice,
                  salePrice: salePrice,
                  previewImg: previewImg,
                  avgRating: avgRating,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    const { isOutfit, productId, currProduct, getProductById, handleRemoveOutfit } = this.props;
    const { compProduct, originalPrice, salePrice, previewImg, notFoundUrl, avgRating, show } = this.state;
    const { name, category } = compProduct;

    if (!isOutfit) {
      return (
        <div>
          <div className="header end">
            <button className="sm card-button absolute" type="button" name="modal-open" onClick={this.handleModalClick}>&#9734;</button>
          </div>
          <ComparisonModal key={productId} currProduct={currProduct} compProduct={compProduct} show={show} handleModalClick={this.handleModalClick} />
          <div className="inner-card" onClick={(event) => ( getProductById(productId, event))}>
            <img className="preview-image" src={previewImg || notFoundUrl}/>
            <div className="card-info">
              <h6>{category}</h6>
              <div>{name}</div>
              <div>${salePrice || originalPrice}</div>
              <div>Rating: {avgRating !== 'no reviews yet' ? `${avgRating}/5` : avgRating}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="header end">
            <button className="sm card-button close-remove absolute" type="button" onClick={(e) => handleRemoveOutfit(e, productId)}>X</button>
          </div>
          <div className="inner-card">
            <img className="preview-image" src={previewImg || notFoundUrl}/>
            <div className="card-info">
              <h6>{category}</h6>
              <div>{name}</div>
              <div>${salePrice || originalPrice}</div>
              <div>Rating: {avgRating !== 'no reviews yet' ? `${avgRating}/5` : avgRating}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Card;
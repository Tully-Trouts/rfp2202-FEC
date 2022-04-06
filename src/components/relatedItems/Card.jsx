import React from 'react';
import axios from 'axios';
import ComparisonModal from './ComparisonModal';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compProduct: {},
      name: '',
      category: '',
      originalPrice: '',
      salePrice: '',
      previewImg: '',
      avgRating: '',
      features: [],
      show: false,
    };

    this.getAllInfo = this.getAllInfo.bind(this);
    this.getAvgRating = this.getAvgRating.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    this.getAllInfo();
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

        const { name, category, features } = response.data;
        const compProduct = response.data;

        axios.get(`api/products/${productId}/styles`)
          .then((response) => {
            let results = response.data.results;
            let defaultStyle = null;

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
                  name: name,
                  category: category,
                  originalPrice: originalPrice,
                  salePrice: salePrice,
                  previewImg: previewImg,
                  avgRating: avgRating,
                  features: features
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

    const { productId, currProduct, getProductById } = this.props;
    const { compProduct, name, category, originalPrice, salePrice, previewImg, avgRating, features, show } = this.state;

    // need to fix aspect ratio for images
    return (
      <div>
        <span>[product id: {productId}]</span>
        <button type="button" name="modal-open" onClick={this.handleModalClick}>modal</button>
        <ComparisonModal key={'1'} currProduct={currProduct} compProduct={compProduct} show={show} handleModalClick={this.handleModalClick} />
        <div className="inner-card" onClick={(event) => ( getProductById(event, productId))}>
          <img className="preview-image" src={previewImg}/>
          <div className="product-info">
            <h6 className="category">{category}</h6>
            <div className="name">{name}</div>
            <div className="price">${salePrice || originalPrice}</div>
            <div className="rating">Rating: {avgRating}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
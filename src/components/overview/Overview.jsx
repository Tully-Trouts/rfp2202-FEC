import React from 'react';
import StyleSelector from './StyleSelector';
import Gallery from './Gallery';
import CartSelector from './CartSelector';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from '../styledComponents';

var Overview = ({product}) => {
  const [avgRating, setAvgRating] = React.useState(0);
  const [styles, setStyles] = React.useState([]);
  const [selectedStyle, setSelectedStyle] = React.useState({});

  var getAvgRating = (reviewMetadata) => {
    let totalRatings = 0;
    let sum = 0;
    for (var star = 1; star <= 5; star += 1) {
      totalRatings += Number(reviewMetadata.ratings[star] || 0);
      sum += Number(reviewMetadata.ratings[star] || 0) * star;
    }
    setAvgRating(totalRatings === 0 ? 0 : (sum / totalRatings).toFixed(2));
  };

  var getProductReviewMetadata = (id) => {
    if (!!id) {
      axios.get('api/reviews/meta', {
        params: {
          'product_id': id,
        }
      })
        .then((response) => {
          console.log('review metadata:', response.data);
          getAvgRating(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  var getProductStyles = (id) => {
    if (!!id) {
      axios.get(`api/products/${id}/styles`)
        .then(({data}) => {
          console.log('styles:', data.results);
          setStyles(data.results);
          // setting the default style
          // find (and return) element with default? = true or last, whichever comes first
          setSelectedStyle(data.results.find(
            (element, index) => element['default?'] || index === (data.results.length - 1)
          ));
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };

  // Passing in an array as second argument to useEffect causes react to check that prop
  //  for changes before using th effect again. This is to prevent infinite loop
  React.useEffect(() => {
    getProductReviewMetadata(product.id);
    getProductStyles(product.id);
  }, [product.id]);

  return (
    <div id="overview-container">
      <h3>Overview</h3>
      <div className="overview overview-main">
        <div className="overview overview-image-panel">
          <Gallery photos={selectedStyle.photos} />
        </div>
        <div className="overview overview-product-information-panel">
          <div className="overview product-review sm">
            [product review: {avgRating}]&nbsp;&nbsp;
            <a href="#rating_and_reviews-container">Read all reviews</a>
          </div>
          <span className="category">{product.category}</span>
          <span className="product-title"><h1>{product.name}</h1></span>
          <div className="overview product-price">
            {!!selectedStyle.sale_price &&
            (<span className="sale-price"> {selectedStyle.sale_price}</span>) ||
            (<span className="original-price">{selectedStyle.original_price}</span>) ||
            (<span className="price">{product.default_price}</span>)}
          </div>
          <StyleSelector styles={styles} setSelectedStyle={setSelectedStyle} />
          <CartSelector skus={selectedStyle.skus} />
        </div>
      </div>
      <div className="overview overview-main-2">
        [testing]
      </div>
      <div className="overview overview-product-description">
        <h5 className="overview-product-description">{product.description}</h5>
      </div>
    </div>
  );
};

Overview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Overview;

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

var Overview = ({product}) => {
  const [avgRating, setAvgRating] = React.useState(0);

  var getAvgRating = (reviewMetadata) => {
    let totalRatings = 0;
    let sum = 0;
    for (var star = 1; star <= 5; star += 1) {
      totalRatings += reviewMetadata.ratings[star];
      sum += reviewMetadata.ratings[star] * star;
    }
    setAvgRating(sum / totalRatings);
  }

  var getProductReviewMetadata = (id) => {
    axios.get('/reviews/meta', {
      params: {
        'product_id': id,
      }
    })
      .then((response) => {
        getAvgRating(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (product.id !== undefined) {
    getProductReviewMetadata(product.id);
  }

  return (
    <div id="overview-container">
      <h3>Overview</h3>
      <div className="overview overview-main">
        <div className="overview overview-image-panel">
          [[expanding] image pane]
        </div>
        <div className="overview overview-product-information-panel">
          [product information panel]
          <div className="overview product-review sm">
            [product review]
          </div>
          <span className="category">{product.category}</span>
          <span className="product-title">{product.name}</span>
          <span className="price">{product.default_price}</span>
          <div className="overview overview-style-selector">
            [style selector]
            <div className="overview color-selector sm">
              [color selector (radio inputs)]
            </div>
          </div>
          <div className="overview cart-selector sm">
            [cart selector]
          </div>
          <div className="overview favorites-selector sm">
            [bag and favorite selector]
          </div>
        </div>
      </div>
      <div className="overview overview-product-description">
        [product description - free form text field]
      </div>
    </div>
  );
};

Overview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Overview;

import React from 'react';
import StyleSelector from './StyleSelector';
import PropTypes from 'prop-types';
import axios from 'axios';

var Overview = ({product}) => {
  const [avgRating, setAvgRating] = React.useState(0);
  const [styles, setStyles] = React.useState([]);

  var getAvgRating = (reviewMetadata) => {
    let totalRatings = 0;
    let sum = 0;
    for (var star = 1; star <= 5; star += 1) {
      totalRatings += Number(reviewMetadata.ratings[star] || 0);
      sum += Number(reviewMetadata.ratings[star] || 0) * star;
    }
    setAvgRating(totalRatings === 0 ? 0 : (sum / totalRatings));
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
          console.log('styles:', data);
          setStyles(data.results);
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
          [[expanding] image pane]
        </div>
        <div className="overview overview-product-information-panel">
          [product information panel]
          <div className="overview product-review sm">
            [product review: {avgRating}]
          </div>
          <span className="category">{product.category}</span>
          <span className="product-title">{product.name}</span>
          <span className="price">{product.default_price}</span>
          <div className="overview overview-style-selector">
            [style selector]
            <div className="overview sm color-selector">
              [color selector (radio inputs)]
              {styles.map((element) => (<li key={element.style_id}>{element.name}</li>))}
            </div>
          </div>
          <div className="overview overview-cart-selector">
            [cart selector]
            <div className="overview sm cart-selector">
              [size select] [qty select]
            </div>
          </div>
          <div className="overview overview-favorites-selector">
            [bag and favorite selector]
            <div className="overview sm favorites-selector">
              [Add to bag btn] [heart btn]
            </div>
          </div>
        </div>
      </div>
      <div className="overview overview-product-description">
        [product description - free form text field]
        {product.description}
      </div>
    </div>
  );
};

Overview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Overview;
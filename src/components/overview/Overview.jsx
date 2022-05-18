import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StyleSelector from './StyleSelector';
import Gallery from './Gallery';
import CartSelector from './CartSelector';
import { StarReview, Link } from '../styledComponents';

function Overview({ product }) {
  const [avgRating, setAvgRating] = React.useState(0);
  const [styles, setStyles] = React.useState([]);
  const [selectedStyle, setSelectedStyle] = React.useState({});
  // const [galleryExpanded, setGalleryExpanded] = React.useState(false);

  const getAvgRating = (reviewMetadata) => {
    let totalRatings = 0;
    let sum = 0;
    for (let star = 1; star <= 5; star += 1) {
      totalRatings += Number(reviewMetadata.ratings[star] || 0);
      sum += Number(reviewMetadata.ratings[star] || 0) * star;
    }
    setAvgRating(totalRatings === 0 ? 0 : (sum / totalRatings).toFixed(2));
  };

  const getProductReviewMetadata = (id) => {
    if (id) {
      axios.get('api/reviews/meta', {
        params: {
          product_id: id,
        },
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

  const getProductStyles = (id) => {
    if (id) {
      axios.get(`api/products/${id}/styles`)
        .then(({ data }) => {
          console.log('styles:', data.results);
          setStyles(data.results);
          // setting the default style
          // find (and return) element with default? = true or last, whichever comes first
          if (data.results.length > 0) {
            // error boundary for results
            setSelectedStyle(data.results.find(
              (element, index) => element['default?'] || index === (data.results.length - 1),
            ));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // let expandoStyle = {
  //   width: '65%',
  // };

  const infoPanelStyle = {};

  // Passing in an array as second argument to useEffect causes react to check that prop
  //  for changes before using th effect again. This is to prevent infinite loop
  React.useEffect(() => {
    getProductReviewMetadata(product.id);
    getProductStyles(product.id);
  }, [product.id]);

  return (
    <div id="overview-container">
      <div id="overview-panel" />
      <div className="overview overview-main">
        <Gallery photos={selectedStyle.photos} />
        <div className="overview overview-product-information-panel" style={infoPanelStyle}>
          <div className="overview product-review sm">
            <StarReview stars={avgRating} />
            {' '}
&nbsp; &nbsp;
            <Link>
              <a href="#rating_and_reviews-container">Read all reviews</a>
            </Link>
          </div>
          <span className="category">{product.category}</span>
          <span className="product-title"><h1>{product.name}</h1></span>
          <div className="overview product-price">
            {!!selectedStyle.sale_price
            && (
            <span className="sale-price">
              {' '}
              $
              {selectedStyle.sale_price}
            </span>
            )
            || (
            <span className="original-price">
              $
              {selectedStyle.original_price}
            </span>
            )
            || (
            <span className="price">
              $
              {product.default_price}
            </span>
            )}
          </div>
          <StyleSelector
            styles={styles}
            setSelectedStyle={setSelectedStyle}
            selected={selectedStyle}
          />
          <CartSelector skus={selectedStyle.skus} />
        </div>
      </div>
      <div className="overview overview-product-description">
        <h4 className="overview-product-description">{product.description}</h4>
      </div>
    </div>
  );
}

Overview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Overview;

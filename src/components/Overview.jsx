import React from 'react';
import PropTypes from 'prop-types';

var Overview = ({product}) => {
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
          <span className="category">Product category</span>
          <span className="product-title">Product Title</span>
          <span className="price">Price</span>
          <div className="overview overview-style-selector">
            [style selector]
            <div className="overview color-selector sm">
              [color selector (radio inputs)]
            </div>
            <div className="overview cart-selector">
              [cart selector]

            </div>
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

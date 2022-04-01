import React from 'react';
import PropTypes from 'prop-types';

var Overview = ({product}) => {
  return (
    <div id="overview-container">
      <h3>Overview</h3>
      <div id="overview-main">
        <div className="overview overview-image-panel">
          ([expanding] image pane)
        </div>
        <div className="overview overview-product-information-panel">
          (product style panel)
        </div>
      </div>
      <div className="overview overview-product-description">
        (product description - free form text field)
      </div>
    </div>
  );
};

Overview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Overview;

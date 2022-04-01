import React from 'react';
import PropTypes from 'prop-types';

var Overview = ({product}) => {
  return (
    <div id="overview-container">
      <h3>Overview</h3>
      <div id="overview">
        <div className="overview-image-panel">
          image pane
        </div>
        <div className="overview-product-detail-panel">
          product detail panel
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Overview;

import React from 'react';
import PropTypes from 'prop-types';

var Overview = ({product}) => {
  return (
    <div>
      <h3>Overview</h3>
      <span>
        {product.name}
      </span>
    </div>
  );
};

Overview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Overview;

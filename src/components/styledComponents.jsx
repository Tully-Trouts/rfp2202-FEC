import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const center = props.size === 1 ? 'center' : 'normal';
  return (
    <button
      className={`styled-btn styled-btn-size-${props.size}`}
      style={{
        flex: props.size,
        justifyContent: center
      }}
      type="button"
      role="button">
      {props.children.toUpperCase()}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.number.isRequired,
};

const Link = (props) => {
  return (
    <span className="styled-link">
      {props.children}
    </span>
  );
};

export { Button, Link };

import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <button
      className={`styled-btn styled-btn-size-${props.size}`}
      style={{
        flex: props.size,
      }}
      type="button"
      role="button"
      onClick={props.onClick}>
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

import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <button
      className={`styled-btn styled-btn-size-${props.size} ${props.className}`}
      style={{
        flex: props.size,
      }}
      type="button"
      role="button"
      value={props.value}
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
    <span className={`styled-link  ${props.className}`}
      value={props.value}
      onClick={props.onClick}>
      {props.children}
    </span>
  );
};

const Input = (props) => {
  return (
    <input
      className={`styled-input styled-input-size-${props.size}`}
      style={{
        flex: props.size,
      }}
      placeholder={props.placeholder.toUpperCase()}
      type={props.type}
      value={props.value}
      onChange={props.onChange}>
      {props.children}
    </input>
  );
};

export { Button, Link, Input };

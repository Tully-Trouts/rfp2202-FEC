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

const StarReview = (props) => {
  let marginLeft = '0%';
  if (props.value) {
    marginLeft = `${props.value}%`;
  } else if (props.stars) {
    marginLeft = `${(props.stars / 5) * 100}%`;
  }

  // Enabling custom color
  let starStyle = {};
  if (props.color) {
    starStyle.fill = props.color;
  }

  return (
    <div className="star-component star-component-container">
      <div className="star-component star-component-stars" style={starStyle}>
        <svg viewBox="0 0 576 512" width="20" title="star"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
        <svg viewBox="0 0 576 512" width="20" title="star"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
        <svg viewBox="0 0 576 512" width="20" title="star"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
        <svg viewBox="0 0 576 512" width="20" title="star"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
        <svg viewBox="0 0 576 512" width="20" title="star"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
        <div className="star-component star-component-cover"
          style={{marginLeft}}>
        </div>
      </div>
    </div>
  );
};

export { Button, Link, Input, StarReview };

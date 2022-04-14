import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <button
      className={`styled-btn styled-btn-size-${props.size} ${props.className}`}
      style={{
        flex: props.size || 0,
      }}
      type="button"
      role="button"
      value={props.value}
      onClick={props.onClick}>
      {props.children.toUpperCase()}
    </button>
  );
};

// Removing requirement for now
// Button.propTypes = {
//   size: PropTypes.number.isRequired,
// };

const Link = (props) => {
  return (
    <span className={`styled-link  ${props.className || 'Link'}`}
      value={props.value}
      onClick={props.onClick}>
      {props.children}
    </span>
  );
};

const Input = (props) => {
  return (
    <input
      className={`styled-input styled-input-size-${props.size || '0'}`}
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
  // Customize color with props.color
  // Customize the number of stars in demoninator with props.max [default = 5]

  let marginLeft = '0%';
  if (props.value) {
    marginLeft = `${props.value}%`;
  } else if (props.stars) {
    marginLeft = `${(props.stars / (props.max || 5)) * 100}%`;
  }

  // custom color
  let starStyle = {};
  if (props.color) {
    starStyle.fill = props.color;
  }

  var drawStars = (max) => {
    return Array.from(Array(max), (e, i) => (
      <svg viewBox="0 0 51 48" width="20" title="star" key={i}>
        <path d="m 25 1 l 6 17 h 18 l -14 11 l 5 17 l -15 -10 l -15 10 l 5 -17 l -14 -11 h 18 Z"></path>
      </svg>
    ));
  };

  return (
    <div className="star-component star-component-container">
      <div className="star-component star-component-stars" style={starStyle}>
        {drawStars(props.max || 5)}
        <div className="star-component star-component-cover"
          style={{marginLeft}}>
        </div>
      </div>
    </div>
  );
};

export { Button, Link, Input, StarReview };

import React from 'react';

var StyleSelector = (props) => {

  var stylesList = (styles) => {
    if (styles.length === 0) {
      return (<li>No styles available</li>);
    }

    return styles.map((element) => (
      <li
        key={element.style_id}
        value={element.style_id}
        className="overview sm style-list-item"
        onClick={()=>{ props.setSelectedStyle(element); }}>
        <span className="style-list-item-circle"
          style={{
            backgroundImage: `url(${element.photos[0].thumbnail_url})`,
          }}></span>
      </li>
    ));
  };

  return (
    <div className="overview overview-style-selector">
      [style selector]
      <div className="overview sm color-selector">
        <ul className="style-list">
          {stylesList(props.styles)}
        </ul>
      </div>
    </div>
  );
};

export default StyleSelector;

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
        style={{
          backgroundImage: `url(${element.photos[0].thumbnail_url})`,
        }}
        onClick={()=>{ props.setSelectedStyle(element); }}>
        {element.name}
      </li>
    ));
  };

  return (
    <div className="overview overview-style-selector">
      [style selector]
      <div className="overview sm color-selector">
        [color selector (radio inputs)]
        <ul className="style-list">
          {stylesList(props.styles)}
        </ul>
      </div>
    </div>
  );
};

export default StyleSelector;

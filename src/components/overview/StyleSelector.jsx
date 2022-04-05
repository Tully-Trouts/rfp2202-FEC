import React from 'react';

var StyleSelector = (props) => {

  var stylesList = (styles) => {
    return styles.map((element) => (
      <li key={element.style_id}
        onClick={()=>{ props.setSelectedStyle(element); }}>{element.name}</li>
    ));
  };

  return (
    <div className="overview overview-style-selector">
      [style selector]
      <div className="overview sm color-selector">
        [color selector (radio inputs)]
        {stylesList(props.styles)}
      </div>
    </div>
  );
};

export default StyleSelector;

import React from 'react';

var StyleSelector = ({styles}) => {
  return (
    <div className="overview overview-style-selector">
      [style selector]
      <div className="overview sm color-selector">
        [color selector (radio inputs)]
        {styles.map((element) => (<li key={element.style_id}>{element.name}</li>))}
      </div>
    </div>
  );
};

export default StyleSelector;

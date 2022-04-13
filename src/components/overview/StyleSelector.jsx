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
            opacity: element.style_id === props.selected.style_id ? '80%' : '50%',
          }}></span>
        <svg xmlns="http://www.w3.org/2000/svg"
          width="30%"
          height="30%"
          viewBox="0 0 24 24"
          className="style-list-item-checkmark"
          style={{
            visibility: element.style_id === props.selected.style_id ? 'visible' : 'hidden'
          }}>
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z" />
        </svg>
      </li>
    ));
  };


  return (
    <div className="overview overview-style-selector">
      <h4 className="style-selector"><b>STYLE &gt;</b> SELECTED STYLE</h4>
      <div className="overview sm color-selector">
        <ul className="style-list">
          {stylesList(props.styles)}
        </ul>
      </div>
    </div>
  );
};

export default StyleSelector;

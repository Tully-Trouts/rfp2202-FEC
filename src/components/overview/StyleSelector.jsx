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
        <svg xmlns="http://www.w3.org/2000/svg"
          width="30%"
          height="30%"
          viewBox="0 0 24 24"
          className="style-list-item-checkmark"
          style={{
            visibility: element.style_id === props.selected.style_id ? 'visible' : 'hidden'
          }}>
          <path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z"/>
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

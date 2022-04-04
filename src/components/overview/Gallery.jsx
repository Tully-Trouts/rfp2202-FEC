import React from 'react';

var Gallery = (props) => {

  var getPhotos = (style) => {
    if (Object.keys(style).length !== 0) {
      return (<img src={props.style.photos[0]}></img>);
    }
  };

  return (
    <div className="overview overview-image-panel">
      [[expanding] image pane]
    </div>
  );
};

export default Gallery;

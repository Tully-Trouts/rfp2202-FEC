import React from 'react';

var Gallery = (props) => {

  var getPhotos = (style) => {
    if (Object.keys(style).length !== 0) {
      return (<img src={props.style.photos[0]} />);
    }
  };

  return (
    <div className="overview overview-image-panel">
      [[expanding] image pane]
      {getPhotos(props.style)}
    </div>
  );
};

export default Gallery;

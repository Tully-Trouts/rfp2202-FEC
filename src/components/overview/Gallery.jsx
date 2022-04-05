import React from 'react';

var Gallery = (props) => {

  var notFound = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png'
  };

  // setting default to a no image available photo from wikipedia
  const [displayPhoto, setDisplayPhoto] = React.useState(notFound);

  // monitor props.photos for changes, use this effect if there are changes
  React.useEffect(() => {
    if (props.photos && props.photos.length !== 0) {
      setDisplayPhoto(props.photos[0]);
    }
  }, [props.photos]);

  // setting the styling for the div. will have to alter later for photo fit etc.
  const divStyle = {
    backgroundImage: `url(${displayPhoto.url})`,
    backgroundSize: 'contain',
  };

  return (
    <div className="overview overview-image-panel" style={divStyle}>
      [[expanding] image pane]
    </div>
  );
};

export default Gallery;

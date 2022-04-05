import React from 'react';

var Gallery = (props) => {

  var notFound = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png'
  };

  // setting default to a no image available photo from wikipedia
  const [displayPhoto, setDisplayPhoto] = React.useState(notFound);
  const [displayPhotoIndex, setDisplayPhotoIndex] = React.useState(0);

  // monitor props.photos for changes, use this effect if there are changes
  React.useEffect(() => {
    setDisplayPhotoIndex(0);
    if (props.photos && props.photos.length !== 0) {
      setDisplayPhoto(props.photos[displayPhotoIndex] || notFound);
    }
  }, [props.photos]);

  // setting the styling for the div. will have to alter later for photo fit etc.
  const divStyle = {
    backgroundImage: `url(${displayPhoto.url})`,
    backgroundSize: 'contain',
  };

  const nextPhoto = () => {
    const nextIndex = displayPhotoIndex < (props.photos.length - 1) ? displayPhotoIndex + 1 : 0;
    setDisplayPhoto(props.photos[nextIndex]);
    setDisplayPhotoIndex(nextIndex);
  };

  const prevPhoto = () => {
    const nextIndex = displayPhotoIndex > 0 ? displayPhotoIndex - 1 : (props.photos.length - 1);
    setDisplayPhoto(props.photos[nextIndex]);
    setDisplayPhotoIndex(nextIndex);
  };

  return (
    <div className="overview overview-image-panel" style={divStyle}>
      <span className="overview sm previous-image-selector" onClick={()=>{ prevPhoto(); }}>
        Previous
      </span>
      <span className="overview sm next-image-selector" onClick={()=>{ nextPhoto(); }}>
        Next
      </span>
    </div>
  );
};

export default Gallery;

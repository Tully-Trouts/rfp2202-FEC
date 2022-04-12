import { findByLabelText } from '@testing-library/react';
import React from 'react';

var Gallery = (props) => {

  const [displayPhotoIndex, setDisplayPhotoIndex] = React.useState(0);

  const [galleryStyle, setGalleryStyle] = React.useState({});

  // monitor props.photos for changes, use this effect if there are changes
  React.useEffect(() => {
    console.log('Rendering gallery');

    if (props.photos && props.photos.length !== 0) {
      const backgroundImage = props.photos.map(element => `url(${element.url})`);
      // Create a background position array for the multiple background images:
      const backgroundPosition = [...Array(props.photos.length)].map(() => '500%');
      // Setting the first element/image to be in the center of the div:
      backgroundPosition[0] = '50%';
      setGalleryStyle({backgroundImage, backgroundPosition});
    }
    setDisplayPhotoIndex(0);
  }, [props.photos]);

  const nextPhoto = () => {
    if (!props.photos || props.photos.length === 0) {
      console.log('No next photos!');
      return;
    }
    const nextIndex = displayPhotoIndex < (props.photos.length - 1) ? displayPhotoIndex + 1 : 0;
    const backgroundPosition = [...Array(props.photos.length)].map((e, i) => i < nextIndex ? '-500%' : '500%');
    backgroundPosition[nextIndex] = '50%';

    const newStyle = {
      backgroundPosition,
      transition: '1s',
      msTransition: '1s',
      WebkitTransition: '1s',
    };

    setGalleryStyle((previousStyle) => ({...previousStyle, ...newStyle}));
    setDisplayPhotoIndex(nextIndex);
  };

  const prevPhoto = () => {
    if (!props.photos || props.photos.length === 0) {
      console.log('No previous photos!');
      return;
    }
    const nextIndex = displayPhotoIndex > 0 ? displayPhotoIndex - 1 : (props.photos.length - 1);
    const backgroundPosition = [...Array(props.photos.length)].map((e, i) => i < nextIndex ? '-500%' : '500%');
    backgroundPosition[nextIndex] = '50%';
    const newStyle = {
      backgroundPosition,
      transition: '1s'
    };
    setGalleryStyle((previousStyle) => ({...previousStyle, ...newStyle}));
    setDisplayPhotoIndex(nextIndex);
  };

  const thumbStyle = {
    display: 'flex',
    position: 'absolute',
    flexFlow: 'column',
  };

  return (
    <div className="overview overview-gallery">
      <span className="overview sm gallery-control previous" onClick={()=>{ prevPhoto(); }}>
        Previous
      </span>
      <span className="overview sm gallery-control next" onClick={()=>{ nextPhoto(); }}>
        Next
      </span>
      <div
        className="gallery-photos"
        style={galleryStyle}>
      </div>
    </div>
  );
};

export default Gallery;

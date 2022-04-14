import { findByLabelText } from '@testing-library/react';
import React from 'react';

var Gallery = (props) => {

  const [displayPhotoIndex, setDisplayPhotoIndex] = React.useState(0);

  const [galleryStyle, setGalleryStyle] = React.useState({});

  const newStyle = {
    transition: '1s',
    msTransition: '1s',
    WebkitTransition: '1s',
  };

  React.useEffect(() => {
    console.log('Rendering gallery');

    if (props.photos && props.photos.length !== 0) {
      const backgroundImage = props.photos.map(element => `url(${element.url})`);
      const backgroundPosition = [...Array(props.photos.length)].map(() => '500%');
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
    setGalleryStyle((previousStyle) => ({...previousStyle, backgroundPosition, ...newStyle}));
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
    setGalleryStyle((previousStyle) => ({...previousStyle, ...newStyle, backgroundPosition}));
    setDisplayPhotoIndex(nextIndex);
  };

  const setPhoto = (index) => {
    const backgroundPosition = [...Array(props.photos.length)].map((e, i) => i < index ? '-500%' : '500%');
    backgroundPosition[index] = '50%';
    setGalleryStyle((previousStyle) => ({...previousStyle, ...newStyle, backgroundPosition}));
    setDisplayPhotoIndex(index);
  };

  var getThumbnails = () => {
    if (props.photos) {
      return (
        Array.from(Array(props.photos.length), (e, i) => i).map((e) => (
          <button
            key={e}
            value={e}
            className="thumbnail-nav-item"
            onClick={()=>{ setPhoto(e); }}
            style={{
              backgroundImage: `url(${e})`
            }}>
          </button>
        ))
      );
    }
  };

  return (
    <div className="overview overview-gallery">
      <nav className="gallery-nav">
        <span className="overview sm gallery-control previous" onClick={()=>{ prevPhoto(); }}>
          Previous
        </span>
        <span className="overview sm gallery-control next" onClick={()=>{ nextPhoto(); }}>
          Next
        </span>
      </nav>
      <div
        className="gallery-photos"
        style={galleryStyle}>
      </div>
      <nav className="thumbnail-nav">
        {getThumbnails()}
      </nav>
    </div>
  );
};

export default Gallery;

import React from 'react';
import ReactDOM from 'react-dom';

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
        props.photos.map((e, i) => (
          <button
            key={i}
            value={i}
            className="thumbnail-nav-item"
            onClick={()=>{ setPhoto(i); }}
            style={{
              backgroundImage: `url(${e.url})`
            }}>
          </button>
        ))
      );
    }
  };

  const imagePanel = document.getElementById('overview-panel');

  return (
    <div className="overview overview-gallery">
      <button
        className="btn image-expando-button"
        onClick={()=>{ setGallerySize(); }}>
        Expando
      </button>
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

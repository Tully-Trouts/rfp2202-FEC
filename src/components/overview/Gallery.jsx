import React from 'react';

var Gallery = (props) => {

  const [displayPhotoIndex, setDisplayPhotoIndex] = React.useState(0);
  const [backgroundPositionArray, setBackgroundPositionArray] = React.useState([]);
  const [backgroundPhotoArray, setBackgroundPhotoArray] = React.useState([]);

  const [galleryStyle, setGalleryStyle] = React.useState({});

  // monitor props.photos for changes, use this effect if there are changes
  React.useEffect(() => {
    console.log('Gallery useEffect firing');

    if (props.photos && props.photos.length !== 0) {
      // New carousel
      // Build the css property with images in background:
      const backgroundImage = props.photos.map(element => `url(${element.url})`);

      // Build the background image position array:
      //  for photo list of length 4, with display index of 0 we want:
      //  backgroundPositionArray = [50%, 500%, 500%, 500%]
      const backgroundPosition = [...Array(props.photos.length)].map(() => '500%');
      // Setting the first element/image to be in the center of the div:
      backgroundPosition[0] = '50%';

      // Setting state:
      setBackgroundPhotoArray(backgroundImage);
      setBackgroundPositionArray(backgroundPosition);
      setGalleryStyle({backgroundImage, backgroundPosition});
    }

    setDisplayPhotoIndex(0);
  }, [props.photos]);

  const nextPhoto = () => {
    // when this fires, I want to change the bg photo position array
    // AND animate the change from the previous
    const nextIndex = displayPhotoIndex < (props.photos.length - 1) ? displayPhotoIndex + 1 : 0;
    // for testing the concept, lets build a new bg position array:
    const backgroundPosition = [...Array(props.photos.length)].map((e, i) => i < nextIndex ? '-500%' : '500%');
    // and set the position of the photo at nextIndex to 50% (center of div):
    backgroundPosition[nextIndex] = '50%';
    // then update the state:
    // This is where I want to add animation to style
    setGalleryStyle((previousStyle) => ({...previousStyle, backgroundPosition}));
    setDisplayPhotoIndex(nextIndex);
  };

  const prevPhoto = () => {
    const nextIndex = displayPhotoIndex > 0 ? displayPhotoIndex - 1 : (props.photos.length - 1);
    const backgroundPosition = [...Array(props.photos.length)].map((e, i) => i < nextIndex ? '-500%' : '500%');
    backgroundPosition[nextIndex] = '50%';
    setGalleryStyle((previousStyle) => ({...previousStyle, backgroundPosition}));
    setDisplayPhotoIndex(nextIndex);
  };

  // Carousel idea: upon photos prop updating, render out each photo as its own div (all of the same size)
  //  upon state change (next or prev) use css to animate the div moving to the center
  //  basically: an array of divs, only the center one is visible
  // Looks like CSS can handle transitions as well:
  //  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions

  return (
    <div className="overview overview-gallery">
      <span className="overview sm gallery-control" onClick={()=>{ prevPhoto(); }}>
        Previous
      </span>
      <span className="overview sm gallery-control" onClick={()=>{ nextPhoto(); }}>
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

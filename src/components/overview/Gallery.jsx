import React from 'react';

var Gallery = (props) => {

  var notFound = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png'
  };

  // setting default to a no image available photo from wikipedia
  const [displayPhoto, setDisplayPhoto] = React.useState(notFound);
  const [displayPhotoIndex, setDisplayPhotoIndex] = React.useState(0);
  const [backgroundPositionArray, setBackgroundPositionArray] = React.useState([]);

  // monitor props.photos for changes, use this effect if there are changes
  React.useEffect(() => {
    setDisplayPhotoIndex(0);

    if (props.photos && props.photos.length !== 0) {
      // New carousel:
      //  for photo list of length 4, with display index of 0 we want:
      //  backgroundPositionArray = [50%, 500%, 500%, 500%]
      const positionArray = [...Array(props.photos.length)].map(() => '500%');
      // Changing the first element to test if this is working:
      positionArray[0] = '50%';
      setBackgroundPositionArray(positionArray);

      // Old carousel:
      setDisplayPhoto(props.photos[displayPhotoIndex] || notFound);
    }
  }, [props.photos]);

  // setting the styling for the div. will have to alter later for photo fit etc.
  const divStyle = {
    backgroundImage: `url(${displayPhoto.url})`,
  };

  const createSlideshow = (photos) => {
    // want to get a big chain of divs with background images contained and centered
    if (photos && photos.length > 0) {
      const photoList = photos.map(element => `url(${element.url})`);
      console.log(photoList);
      // elements can have multiple background-images
      // background images can be offset with the background-position property
      //  giving comma separated values for each image:
      //  background-position: -1000%, 50%, 1000%, 1000%, 1000%
      // These percentages can probably also be animated.
      return (
        <div
          className="gallery-photos"
          style={{
            backgroundImage: photoList,
            backgroundPosition: backgroundPositionArray,
          }}>
        </div>
      );
    }
  };

  // Can have multiple background images:
  const createBackground = (photos) => {
    const photoList = photos.map(element => `url(${element.url})`);
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

  // Carousel idea: upon photos prop updating, render out each photo as its own div (all of the same size)
  //  upon state change (next or prev) use css to animate the div moving to the center
  //  basically: an array of divs, only the center one is visible
  // Looks like CSS can handle transitions as well:
  //  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions

  return (
    <div className="overview overview-gallery" style={divStyle}>
      <div className="overview overview-slideshow">
        [slideshow]
        {createSlideshow(props.photos)}
      </div>
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

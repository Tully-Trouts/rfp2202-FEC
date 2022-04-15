import React from 'react';

class SubmittedImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setModal: false,
    };
  }


  render() {
    const renderedImg = this.props.providedImg.map((eachImg, i) =>
      <img className="submittedImage"
        key='i'
        src={eachImg.url}
      />
    );
    return (
      <div>
        {renderedImg}
      </div>
    );
  }
}

export default SubmittedImg;
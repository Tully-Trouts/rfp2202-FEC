import React from 'react';

class RatingReviewBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const x = (this.props.ratingValue * 20) - 3;
    const y = -7;
    const styles = {
      transform: `translate(${x}%, ${y}px)`
    };

    console.log('rating value', this.props.ratingValue);
    console.log(styles);
    if (this.props.ratingValue !== null) {
      return (
        <div>
          <div>{this.props.name}</div>
          <div className="ReviewBar-Container">
            <div className="progress-bar-Container">
              <div className="comparison-bar_bg">
                <div className="comparison-bar-triangle" style={styles}>
                </div>
              </div>
            </div>
            <div className="characteristic-container">
              <div className="char-1">
                Too Small
              </div>
              <div className="char-2">
                  Perfect
              </div>
              <div className="char-3">
                  Too Large
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default RatingReviewBar;
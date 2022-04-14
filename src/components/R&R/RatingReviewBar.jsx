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
    console.log('Test charIndex', this.props.charIndex);
    if (this.props.ratingValue !== null) {
      if (this.props.charIndex === 'Size') {
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
                <div className="char-1-s">
                  Too Small
                </div>
                <div className="char-2-s">
                    Perfect
                </div>
                <div className="char-3-s">
                    Too Large
                </div>
              </div>
            </div>
          </div>
        );
      } else if (this.props.charIndex === 'Width') {
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
                  Too Narrow
                </div>
                <div className="char-2">
                    Perfect
                </div>
                <div className="char-3">
                    Too Wide
                </div>
              </div>
            </div>
          </div>
        );
      } else if (this.props.charIndex === 'Comfort') {
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
                <div className="char-1-comfort">
                  Uncomfortable
                </div>
                <div className="char-2-comfort">
                    Comfortable
                </div>
              </div>
            </div>
          </div>
        );
      } else if (this.props.charIndex === 'Quality') {
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
                <div className="char-1-quality">
                  Poor
                </div>
                <div className="char-2-quality">
                    Perfect
                </div>
              </div>
            </div>
          </div>
        );
      } else if (this.props.charIndex === 'Length') {
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
                  Runs Short
                </div>
                <div className="char-2">
                    Perfect
                </div>
                <div className="char-3">
                    Runs Long
                </div>
              </div>
            </div>
          </div>
        );
      } else if (this.props.charIndex === 'Fit') {
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
                  Runs Tight
                </div>
                <div className="char-2">
                    Perfect
                </div>
                <div className="char-3">
                    Runs Long
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default RatingReviewBar;
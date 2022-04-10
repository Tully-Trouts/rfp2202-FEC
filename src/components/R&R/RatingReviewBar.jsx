import React from 'react';

class RatingReviewBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var totalperc = (this.props.ratingValue * 20);

    console.log('rating value', this.props.ratingValue);
    console.log(totalperc);
    if (this.props.ratingValue !== null) {
      return (
        <div>
          <div>{this.props.name}</div>
          <div className="ReviewBar-Container">
            <div className="progress-Container">
              <div className="progress">
                <div className="progress-done" style={{
                  opacity: 1,
                  width: `${totalperc}%`
                }}>
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
    } else if (this.props.starRating) {
      return (
        <div>
          <div className="ReviewBar-Container">
            <div className="progress-Container">
              <div className="progress">
                <div className="progress-done" style={{
                  opacity: 1,
                  width: `${this.props.starRating}%`
                }}>
                </div>
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
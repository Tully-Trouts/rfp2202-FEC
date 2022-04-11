import React from 'react';

class StarReviewBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div className="StarBar-Container">
          <div className="progress-Container">
            {this.props.currentStar} Star
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
  }
}


export default StarReviewBar;
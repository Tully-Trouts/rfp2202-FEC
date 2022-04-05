import React from 'react';

class IndividualReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: true,
    };
  }

  render() {
    return (
      <div className="Review">
        <div className="ReviewInfo">
          <div className="ReviewerName">
            Reviewer Name
          </div>
          <div className="StarRating">
            Star Rating
          </div>
          <div className="Date">
            Review Date
          </div>
          <div className="Review_Summary_Container">
            <span className="Review_Summary">
              Review Summary
            </span>
          </div>
          <div className="Review_Body_Container">
            <span className="Review_Body">
              Review Body
            </span>
          </div>
          <div className="Response">
            {this.state.review &&
              <h2>
                Review
              </h2>
            }
          </div>
          <div className="Rating_Helpfull">
            Rating Helpfullness
          </div>
        </div>
      </div>
    );
  }
}

export default IndividualReview;
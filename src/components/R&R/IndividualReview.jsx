import React from 'react';

class IndividualReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: false,
    };
  }

  render() {
    // if (this.props.eachReview.response !== "") {
    //   this.setState({review: true});
    // }
    return (
      <div className="review-tile">
        <div className="ReviewerName">
          {this.props.review.reviewer_name}
        </div>
        <div className="StarRating">
          {this.props.review.rating}
        </div>
        <div className="Date">
          {this.props.review.date}
        </div>
        <div className="Review_Summary_Container">
          <span className="Review_Summary">
            {this.props.review.summary}
          </span>
        </div>
        <div className="Review_Body_Container">
          <span className="Review_Body">
            {this.props.review.body}
          </span>
        </div>
        <div className="Response">
          {this.state.review &&
            <h2>
              {this.props.review.response}
            </h2>
          }
        </div>
        <div className="Rating_Helpfull">
          {this.props.review.helpfulness}
        </div>
      </div>
    );
  }
}

export default IndividualReview;
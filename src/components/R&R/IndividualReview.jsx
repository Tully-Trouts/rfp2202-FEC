import React from 'react';
import moment from 'moment';
import StarReview from './StarReview.jsx';

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
        <div className="User-box-1">
          <div className="StarRating">
            <StarReview starRating={this.props.review.rating * 20} />
          </div>
          <div className="USER-DATE">
            <div className="ReviewerName">
              {this.props.review.reviewer_name}
            </div>
            <div className="Date">
              {moment(`${this.props.review.date}`).format('MMMM Do YYYY')}
            </div>
          </div>
        </div>
        <div className="Review_Summary_Container">
          <span className="Review_Summary">
            <h3 className="Summary-text">
              {this.props.review.summary}
            </h3>
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
              [Response] {this.props.review.response}
            </h2>
          }
        </div>
        <div className="Rating_Helpful">
          Helpful?  Yes({this.props.review.helpfulness}) | Report
        </div>
      </div>
    );
  }
}

export default IndividualReview;
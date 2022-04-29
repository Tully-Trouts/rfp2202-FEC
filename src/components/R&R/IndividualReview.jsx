import React from 'react';
import moment from 'moment';
import StarReview from './StarReview.jsx';
import { Link } from '../styledComponents';
import axios from 'axios';
import SubmittedImg from './SubmittedImg.jsx';

class IndividualReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: false,
      selectYes: false,
    };
    this.handleYesSelect = this.handleYesSelect.bind(this);
    this.handleReportSelect = this.handleReportSelect.bind(this);
  }

  handleYesSelect(event) {
    event.preventDefault();
    if (!this.state.selectYes) {
      this.setState({selectYes: true});
      axios.put(`api/reviews/${this.props.review.review_id}/helpful`)
        .then((result) => {
          this.props.retrieveReviewList(this.props.productId);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleReportSelect(event) {
    event.preventDefault();
    axios.put(`api/reviews/${this.props.review.review_id}/report`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
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
        <div className="photoContainer">
          <SubmittedImg providedImg={Array(this.props.review.photos)}/>
        </div>
        <div className="Response">
          {this.state.review &&
            <h2>
              [Response] {this.props.review.response}
            </h2>
          }
        </div>
        <div className="Rating_Helpful">
          Helpful?{' '}
          <Link onClick={this.handleYesSelect}>Yes</Link>
          { `(${this.props.review.helpfulness}) | `}
          <Link onClick={this.handleReportSelect}>Report</Link>
        </div>
      </div>
    );
  }
}

export default IndividualReview;
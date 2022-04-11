import React from 'react';
import IndividualReview from './IndividualReview.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const eachReview = this.props.reviewList.map((review, i) =>
      <IndividualReview key={i} review={review} />
    );


    if (this.props.reviewList[0] === undefined || this.props.reviewList[0].review_id === null || this.props.reviewList[0].review_id === undefined) {
      return (
        <div>
          [Rating] No Reviews At This Time!
        </div>
      );
    } else {
      return (
        <div>
          <div className="ReviewList_container">
            {eachReview}
          </div>
        </div>
      );
    }
  }
}


export default ReviewList;
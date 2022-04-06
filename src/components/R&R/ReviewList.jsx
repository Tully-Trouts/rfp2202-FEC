import React from 'react';
import IndividualReview from './IndividualReview.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.reviewList);
    const eachReview = this.props.reviewList.map((review) =>
      <IndividualReview review={review} />
    );
    return (
      <div>
        Rating
        <div className="ReviewList_container">
          {eachReview}
        </div>
      </div>
    );
  }
}


export default ReviewList;
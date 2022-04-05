import React from 'react';
import IndividualReview from './IndividualReview.jsx';

class ReviewList extends React.Component {

  render() {
    // const eachReview = this.props.reviewList.map((eachReview) =>
    //   <IndividualReview eachReview={eachReview} />
    // );
    // const {reviewList} = this.props;
    console.log(this.props.reviewList);
    return (
      <div>
        Rating
        <div className="ReviewList">
          <IndividualReview />
        </div>
      </div>
    );
  }
}


export default ReviewList;
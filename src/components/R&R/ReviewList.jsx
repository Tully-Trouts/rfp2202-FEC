import React from 'react';
import IndividualReview from './IndividualReview.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // if (this.props.productId) {
    //   const eachReview = this.props.reviewList.map((eachReview) =>
    //     <IndividualReview eachReview={eachReview} />
    //   );
    // }
    // console.log('----->Here<------', this.props.reviewList);
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
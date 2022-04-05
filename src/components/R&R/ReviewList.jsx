import React from 'react';
import IndividualReview from './IndividualReview.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <div>
        Rating
        <div>
          <IndividualReview />
        </div>
      </div>
    )
  }
}


export default ReviewList;
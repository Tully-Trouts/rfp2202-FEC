/* eslint-disable camelcase */
import React from 'react';
import ReviewList from './R&R/ReviewList.jsx';
import RatingBreakdown from './R&R/RatingBreakdown.jsx';
import Sort from './R&R/Sort.jsx';
import AddReview from './R&R/AddReview.jsx';
import axios from 'axios';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [
        {
          review_id: null,
          rating: null,
          summary: null,
          recommend: null,
          response: null,
          body: null,
          date: null,
          reviewer_name: null,
          helpfulness: null,
          photos: []
        }
      ],
      sort: 'relevant',
    };
    this.retrieveReviewList = this.retrieveReviewList.bind(this);
  }

  retrieveReviewList(productId) {
    axios({
      method: 'get',
      url: '/api/reviews/',
      params: {
        sort: this.state.sort,
        product_id: productId,
      }
    })
      .then((result) => {
        console.log('---->HERE<------', result.data.results);
        this.setState({reviewList: result.data.results});
      })
      .catch((err) => {
        console.log(err);
      });
  }


  componentDidMount() {
    // FOR DEV: need to remove hard coded  productId
    this.retrieveReviewList(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.retrieveReviewList(this.props.productId);
    }
  }


  render() {
    return (
      <div id="rating_and_reviews-container">
        <h3>Rating and Review</h3>
        <div id="review-panal">
          <div className="sorting">
            <Sort />
          </div>
          <div className="RR-Container">
            <div className="rating_container">
              <RatingBreakdown productId={this.props.productId}/>
            </div>
            <div className="review_list">
              <ReviewList reviewList={this.state.reviewList} />
            </div>
          </div>
        </div>
        <div className="btn-container">
          <div className="more_review-btn">
            <button>
              More Review
            </button>
          </div>
          <div id="add_review-btn">
            <AddReview productName={this.props.productName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Ratings;
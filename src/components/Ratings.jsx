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
      tileRender: 2,
    };
    this.retrieveReviewList = this.retrieveReviewList.bind(this);
    this.handleMoreReview = this.handleMoreReview.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }

  handleMoreReview(e) {
    e.preventDefault();
    this.setState({tileRender: this.state.tileRender + 2});
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
        this.setState({reviewList: result.data.results, tileRender: 2});
      })
      .catch((err) => {
        console.log(err);
      });
  }


  componentDidMount() {
    // FOR DEV: need to remove hard coded  productId
    this.retrieveReviewList(this.props.productId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productId !== this.props.productId) {
      this.retrieveReviewList(this.props.productId);
    } else if (prevState.sort !== this.state.sort) {
      this.retrieveReviewList(this.props.productId);
    }
  }

  updateSort(value) {
    this.setState({sort: value});
    this.retrieveReviewList(this.props.productId);
  }


  render() {
    const tileLoad = this.state.reviewList.slice(0, this.state.tileRender);
    if (this.state.tileRender >= this.state.reviewList.length) {
      return (
        <div id="rating_and_reviews-container">
          <h3>Rating and Review</h3>
          <div id="review-panal">
            <div className="sorting">
              <Sort updateSort={this.updateSort}/>
            </div>
            <div className="RR-Container">
              <div className="rating_container">
                <RatingBreakdown productId={this.props.productId}/>
              </div>
              <div className="review_list">
                <ReviewList reviewList={tileLoad} />
              </div>
            </div>
          </div>
          <div className="btn-container-updated">
            <div id="add_review-btn">
              <AddReview productName={this.props.productName}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="rating_and_reviews-container">
          <h3>Rating and Review</h3>
          <div id="review-panal">
            <div className="sorting">
              <Sort updateSort={this.updateSort}/>
            </div>
            <div className="RR-Container">
              <div className="rating_container">
                <RatingBreakdown productId={this.props.productId}/>
              </div>
              <div className="review_list">
                <ReviewList reviewList={tileLoad} />
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div className="more_review-btn">
              <button id="more-review-btn" onClick={this.handleMoreReview}>
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
}

export default Ratings;
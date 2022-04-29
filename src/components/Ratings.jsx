/* eslint-disable camelcase */
import React from 'react';
import ReviewList from './R&R/ReviewList.jsx';
import RatingBreakdown from './R&R/RatingBreakdown.jsx';
import Sort from './R&R/Sort.jsx';
import AddReview from './R&R/AddReview.jsx';
import axios from 'axios';
import { Button } from './styledComponents';

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
      submitCharOption: null,
    };
    this.retrieveReviewList = this.retrieveReviewList.bind(this);
    this.handleMoreReview = this.handleMoreReview.bind(this);
    this.updateCharOption = this.updateCharOption.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleMoreReview(e) {
    e.preventDefault();
    this.setState({tileRender: this.state.tileRender + 2});
  }

  retrieveReviewList(productId, filter) {
    axios({
      method: 'get',
      url: 'http://54.153.66.246/reviews',
      params: {
        sort: filter,
        product_id: productId,
        count: 20,
      }
    })
      .then((result) => {
        console.log(result);
        this.setState({reviewList: result.data.results, tileRender: 2});
      })
      .catch((err) => {
        console.log(err);
      });
  }


  componentDidMount() {
    // FOR DEV: need to remove hard coded  productId
    this.retrieveReviewList(1000, 'Relevant');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productId !== this.props.productId) {
      this.retrieveReviewList(this.props.productId, this.state.sort);
    }
  }

  updateCharOption(value) {
    this.setState({submitCharOption: value});
  }

  handleSort(value) {
    this.setState({sort: value});
  }

  render() {
    const tileLoad = this.state.reviewList.slice(0, this.state.tileRender);
    if (this.state.tileRender >= this.state.reviewList.length) {
      return (
        <div id="rating_and_reviews-container">
          <h3>Rating and Review</h3>
          <div id="review-panal">
            <div className="sorting">
              <Sort retrieveReviewList={this.retrieveReviewList} totalCurrentReviews={this.state.reviewList.length} productId={this.props.productId} handleSort={this.handleSort}/>
            </div>
            <div className="RR-Container">
              <div className="rating_container">
                <RatingBreakdown productId={this.props.productId} updateCharOption={this.updateCharOption}/>
              </div>
              <div className="review_list">
                <ReviewList reviewList={tileLoad} productId={this.props.productId} retrieveReviewList={this.retrieveReviewList}/>
              </div>
            </div>
          </div>
          <div className="btn-container-updated">
            <div id="add_review-btn">
              <AddReview productName={this.props.productName} submitCharOption={this.state.submitCharOption} productId={this.props.productId}/>
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
              <Sort retrieveReviewList={this.retrieveReviewList} totalCurrentReviews={this.state.reviewList.length} productId={this.props.productId} handleSort={this.handleSort}/>
            </div>
            <div className="RR-Container">
              <div className="rating_container">
                <RatingBreakdown productId={this.props.productId} updateCharOption={this.updateCharOption}/>
              </div>
              <div className="review_list">
                <ReviewList reviewList={tileLoad} productId={this.props.productId} retrieveReviewList={this.retrieveReviewList}/>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div className="more_review-btn">
              <Button id="more-review-btn" size={2} onClick={this.handleMoreReview}>
                More Review
              </Button>
            </div>
            <div id="add_review-btn">
              <AddReview productName={this.props.productName} submitCharOption={this.state.submitCharOption} productId={this.props.productId}/>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Ratings;
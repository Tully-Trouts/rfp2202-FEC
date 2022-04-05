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
      reviewList: {},
    };
  }


  componentDidMount() {
    // FOR DEV: need to remove hard coded  productId
    const productId = this.props.productId || 65634;
    axios({
      method: 'get',
      url: '/api/reviews/',
      params: {
        sort: 'newest',
        product_id: productId,
      }
    })
      .then((result) => {
        this.setState({reviewList: result.data.results});
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <div id="rating and review container">
        <h3>Rating and Review</h3>
        <div id="sorting">
          <Sort />
        </div>
        <div id="review list">
          <ReviewList reviewList={this.state.reviewList}/>
        </div>
        <div id="rating container">
          <RatingBreakdown />
        </div>
        <div id="more review - button">
          <button>
            More Review
          </button>
        </div>
        <div id="add review">
          <AddReview />
        </div>
      </div>
    );
  }
}

export default Ratings;
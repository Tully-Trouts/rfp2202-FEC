import React from 'react';
import ReviewList from './R&R/ReviewList.jsx';
import RatingBreakdown from './R&R/RatingBreakdown.jsx';
import Sort from './R&R/Sort.jsx';
import axios from 'axios';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
    };
    this.getReviewListById = this.getReviewListById.bind(this);
    this.getData = this.getData.bind(this);
  }


  getData(e) {
    e.preventDefault();
    axios.get('/api/reviews', {
      params: {
        sort: 'relevant',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getReviewListById(productId) {
    axios.get('/api/reviews/', {
      params: {
        sort: 'relevant',
        product_id: productId,
      },
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          reviewList: response.data,
        });
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
          <div  id="review list">
            <ReviewList />
          </div>
          <div id="rating container">
            <RatingBreakdown />
          </div>
          <div id="more review - button">
            More Review
          </div>
          <div id="add review - button">
            Add Review
          </div>
          <button onClick={this.getData}>
            Get data
          </button>
      </div>
    )
  }
}

export default Ratings;
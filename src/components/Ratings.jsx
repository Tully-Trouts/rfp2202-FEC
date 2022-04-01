import React from 'react';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
    };
    this.getReviewListById = this.getReviewListById.bind(this);
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
      <div>RATINGS</div>
    )
  }
}

export default Ratings;
import React from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(event) {
    this.props.retrieveReviewList(this.props.productId, event.target.value);
  }

  render() {
    if (this.props.totalCurrentReviews > 1) {
      return (
        <div className="sort-label">
          {`${this.props.totalCurrentReviews} reviews, sorted by`}
          <label className="sort-btn">
            <select className="sort-btn-container" onChange={this.handleSortChange}>
              <option value="relevant">Relevant</option>
              <option value="helpful">Helpful</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}


export default Sort;
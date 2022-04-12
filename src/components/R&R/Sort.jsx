import React from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(event) {
    this.props.updateSort(event.target.value);
  }

  render() {
    console.log('Current Total', this.props.totalCurrentReviews);
    if (this.props.totalCurrentReviews > 1) {
      return (
        <div className="sort-label">
          {`${this.props.totalCurrentReviews} reviews, sorted by`}
          <label className="sort-btn">
            <select className="sort-btn-container" onChange={this.handleSortChange}>
              <option value="Relevant">Relevant</option>
              <option value="Helpful">Helpful</option>
              <option value="Newest">Newest</option>
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
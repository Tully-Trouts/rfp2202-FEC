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
    return (
      <div className="sort-label">
        Sort on:
        <label className="sort-btn">
          <select onChange={this.handleSortChange}>
            <option value="Relevant">Relevant</option>
            <option value="Helpful">Helpful</option>
            <option value="Newest">Newest</option>
          </select>
        </label>
      </div>
    );
  }
}

export default Sort;
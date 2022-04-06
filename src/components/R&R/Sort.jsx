import React from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sort-label">
        <label>
          Sort on:
          <select>
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
import React from 'react';
import { Link } from '../styledComponents';

class StarReviewBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  handleStarClick(event) {
    event.preventDefault();
    this.props.handleStarClickFilter(this.props.currentStar);
  }

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div className="StarBar-Container">
          <div className="progress-Container">
            <Link onClick={this.handleStarClick}>
              {this.props.currentStar} Star </Link>
            <div className="progress">
              <div className="progress-done" style={{
                opacity: 1,
                width: `${this.props.starRating}%`
              }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default StarReviewBar;
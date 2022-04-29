/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import StarReview from './StarReview.jsx';
import RatingReviewBar from './RatingReviewBar.jsx';
import StarReviewBar from './StarReviewBar.jsx';
import { Link } from '../styledComponents';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: {
        product_id: null,
        ratings: {'1': null, '2': null, '3': null, '4': null, '5': null},
        recommended: {},
        characteristics: {
          Fit: {value: null},
          Length: {value: null},
          Comfort: {value: null},
          Quality: {value: null},
          Width: {value: null},
          Size: {value: null},
        },
      },
      total: 0,
      totalReviewScore: 0,
      totalAvgReview: 0,
      clothes: null,
      starId: [],
      allPossibleChar: ['Fit', 'Length', 'Comfort', 'Quality', 'Width', 'Size']
    };
    this.retrieveMetaList = this.retrieveMetaList.bind(this);
    this.totalReview = this.totalReview.bind(this);
    this.totalRatingScore = this.totalRatingScore.bind(this);
    this.handleStarClickFilter = this.handleStarClickFilter.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
  }

  totalReview(object) {
    var totalreview = 0;
    const total = (Object.values(object));
    for (var i = 0; i < total.length; i++) {
      totalreview += parseInt(total[i]);
    }
    this.setState({total: totalreview});
  }

  totalRatingScore(object) {
    var totalscore = 0;
    var currentRank = 1;
    const total = (Object.values(object));
    for (var i = 0; i < total.length; i++) {
      totalscore += currentRank * parseInt(total[i]);
      currentRank += 1;
    }
    this.setState({totalReviewScore: totalscore});
  }

  retrieveMetaList(productId) {
    this.setState({clothes: null});
    axios({
      method: 'get',
      url: 'http://54.153.66.246/reviews/meta',
      params: {
        // eslint-disable-next-line camelcase
        product_id: productId
      }
    })
      .then((result) => {
        console.log('\n\n', result.data);
        this.setState({overview: result.data});
        this.totalReview(this.state.overview.ratings);
        this.totalRatingScore(this.state.overview.ratings);
        const avgReview = Number(this.state.totalReviewScore / this.state.total).toFixed(1);
        if (avgReview !== 'NaN') {
          this.setState({totalAvgReview: avgReview});
        } else {
          this.setState({totalAvgReview: 0});
        }
        if (this.state.overview.characteristics.Fit) {
          this.setState({clothes: true});
          this.props.updateCharOption(1);
        } else if (this.state.overview.characteristics.Width) {
          this.setState({clothes: false});
          this.props.updateCharOption(2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleStarClickFilter(starId) {
    if (this.state.starId.includes(starId)) {
      const updatedStarId = this.state.starId.filter(word => word !== starId);
      this.setState({starId: updatedStarId});
    } else {
      this.setState({starId: [...this.state.starId, starId]});
    }
  }

  handleClearFilter(event) {
    event.preventDefault();
    this.setState({starId: []});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.retrieveMetaList(this.props.productId);

    }
  }

  render() {
    let totalRecommended = ((Number(this.state.overview.recommended.true) / (Number(this.state.overview.recommended.false) + Number(this.state.overview.recommended.true)) * 100).toFixed(2));

    if (totalRecommended === 'NaN') {
      totalRecommended = 0;
    }
    var currentStar = 0;
    const starRating = Object.values(this.state.overview.ratings);
    const starOverallRating = starRating.map((starValue, i) =>
      <StarReviewBar key={i} starRating={Number((parseInt(starValue) / parseInt(this.state.total)) * 100).toFixed(2)} currentStar={currentStar += 1} handleStarClickFilter={this.handleStarClickFilter}/>
    );
    if (this.state.clothes === true) {
      return (
        <div>
          <div className="Title-text">Rating & Reviews</div>
          <div className="characterboxA">
            <div className="StarScore-RR">
              <div className="RatingScore-Int">
                {this.state.totalAvgReview}
              </div>
              <div className="RatingScore-Star">
                <StarReview starRating={this.state.totalAvgReview * 20}/>
              </div>
            </div>
            <div className="totalRecommended">
              {totalRecommended}% of reviews recommend this product
            </div>
            <div>
              {starOverallRating}
            </div>
            <div className="currentStarFilter-Active">
              Current Filter Active: {this.state.starId}
            </div>
            <div className="resetFilter-btn-container">
              <Link className="resetFilter-btn" onClick={this.handleClearFilter}>
              Clear Filter
              </Link>
            </div>
            <div className="comfort-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Comfort.value} name={(<div className={'characteristic-tag'}>Comfort</div>)} charIndex={this.state.allPossibleChar[2]}/>
            </div>
            <div className="quality-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Quality.value} name={(<div className={'characteristic-tag'}>Quality</div>)} charIndex={this.state.allPossibleChar[3]}/>
            </div>
            <div className="length-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Length.value} name={(<div className={'characteristic-tag'}>Length</div>)} charIndex={this.state.allPossibleChar[1]}/>
            </div>
            <div className="fit-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Fit.value} name={(<div className={'characteristic-tag'}>Fit</div>)} charIndex={this.state.allPossibleChar[0]}/>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clothes === false) {
      return (
        <div>
          <div className="Title-text">Rating & Reviews</div>
          <div className="characterboxA">
            <div className="StarScore-RR">
              <div className="RatingScore-Int">
                {this.state.totalAvgReview}
              </div>
              <div className="RatingScore-Star">
                <StarReview starRating={this.state.totalAvgReview * 20}/>
              </div>
            </div>
            <div className="totalRecommended">
              {totalRecommended}% of reviews recommend this product
            </div>
            <div>
              {starOverallRating}
            </div>
            <div className="currentStarFilter-Active">
              Current Filter Active: {this.state.starId}
            </div>
            <div className="resetFilter-btn-container">
              <Link className="resetFilter-btn" onClick={this.handleClearFilter}>
              Clear Filter
              </Link>
            </div>
            <div className="comfort-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Comfort.value} name={(<div className={'characteristic-tag'}>Comfort</div>)} charIndex={this.state.allPossibleChar[2]}/>
            </div>
            <div className="quality-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Quality.value} name={(<div className={'characteristic-tag'}>Quality</div>)} charIndex={this.state.allPossibleChar[3]}/>
            </div>
            <div className="size-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Size.value} name={(<div className={'characteristic-tag'}>Size</div>)} charIndex={this.state.allPossibleChar[5]}/>
            </div>
            <div className="width-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Width.value} name={(<div className={'characteristic-tag'}>Width</div>)} charIndex={this.state.allPossibleChar[4]}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          No Data
        </div>
      );
    }
  }
}

export default RatingBreakdown;


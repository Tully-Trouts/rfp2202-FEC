/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import StarReview from './StarReview.jsx';
import RatingReviewBar from './RatingReviewBar.jsx';
import StarReviewBar from './StarReviewBar.jsx';

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
    };
    this.retrieveMetaList = this.retrieveMetaList.bind(this);
    this.totalReview = this.totalReview.bind(this);
    this.totalRatingScore = this.totalRatingScore.bind(this);
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
      url: '/api/reviews/meta/',
      params: {
        // eslint-disable-next-line camelcase
        product_id: productId
      }
    })
      .then((result) => {
        this.setState({overview: result.data});
        this.totalReview(this.state.overview.ratings);
        console.log('Current Metadata', this.state.overview);
        this.totalRatingScore(this.state.overview.ratings);
        const avgReview = Number(this.state.totalReviewScore / this.state.total).toFixed(1);
        this.setState({totalAvgReview: avgReview});
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

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.retrieveMetaList(this.props.productId);
    }
  }

  render() {
    var currentStar = 0;
    const starRating = Object.values(this.state.overview.ratings);
    const starOverallRating = starRating.map((starValue) =>
      <StarReviewBar starRating={Number((parseInt(starValue) / parseInt(this.state.total)) * 100).toFixed(2)} currentStar={currentStar += 1}/>

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
            <div>
              {starOverallRating}
            </div>
          [Characteristics]
            <div className="comfort-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Comfort.value} name={(<div classname={'characteristic-tag'}>Comfort</div>)}/>
            </div>
            <div className="quality-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Quality.value} name={(<div classname={'characteristic-tag'}>Quality</div>)}/>
            </div>
            <div className="length-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Length.value} name={(<div classname={'characteristic-tag'}>Length</div>)}/>
            </div>
            <div className="fit-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Fit.value} name={(<div classname={'characteristic-tag'}>Fit</div>)}/>
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
            <div>
              {starOverallRating}
            </div>
          [Characteristics]
            <div className="comfort-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Comfort.value} name={(<div classname={'characteristic-tag'}>Comfort</div>)}/>
            </div>
            <div className="quality-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Quality.value} name={(<div classname={'characteristic-tag'}>Quality</div>)}/>
            </div>
            <div className="size-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Size.value} name={(<div classname={'characteristic-tag'}>Size</div>)}/>
            </div>
            <div className="width-tag">
              <RatingReviewBar ratingValue={this.state.overview.characteristics.Width.value} name={(<div classname={'characteristic-tag'}>Width</div>)}/>
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


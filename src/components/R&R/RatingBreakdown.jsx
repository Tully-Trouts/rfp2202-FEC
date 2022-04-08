/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import StarReview from './StarReview.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: {
        product_id: null,
        rating: {},
        recommended: {},
        fit: null,
        length: null,
        comfort: null,
        quality: null,
        width: null,
        size: null,
      },
      done: 40,
      done2: 30,
      done3: 80,
      done4: 20,
      done5: 55,
    };
    this.retrieveMetaList = this.retrieveMetaList.bind(this);
  }

  retrieveMetaList(productId) {
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
        
        console.log(this.state.overview);
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
    return (
      <div>
        <h4 className="ratings-reviews-text">
          Ratings & Reviews
        </h4>
        <div className="progress-Container">
          <div className="progress">
            <div className="progress-done1" style={{
              opacity: 1,
              width: `${this.state.done}%`
            }}>
              {this.state.done}%
            </div>
          </div>
          <div className="progress">
            <div className="progress-done2" style={{
              opacity: 1,
              width: `${this.state.done2}%`
            }}>
              {this.state.done2}%
            </div>
          </div>
          <div className="progress">
            <div className="progress-done3" style={{
              opacity: 1,
              width: `${this.state.done3}%`
            }}>
              {this.state.done3}%
            </div>
          </div>
          <div className="progress">
            <div className="progress-done4" style={{
              opacity: 1,
              width: `${this.state.done4}%`
            }}>
              {this.state.done4}%
            </div>
          </div>
          <div className="progress">
            <div className="progress-done5" style={{
              opacity: 1,
              width: `${this.state.done5}%`
            }}>
              {this.state.done5}%
            </div>
          </div>
        </div>
        <div className="StarRating-breakdown">
          <StarReview />
        </div>
      </div>
    );
    // if (this.state.shoes === false) {
    //   return (
    //     <div>
    //       [Rating & Reviews]
    //       <div className="characterboxA">
    //       [Characteristics]
    //         <div className="comfort-tag">
    //         [Comfort] {this.state.metadata.characteristics.Comfort.value}
    //         </div>
    //         <div className="quality-tag">
    //         [Quality] {this.state.metadata.characteristics.Quality.value}
    //         </div>
    //         <div className="length-tag">
    //         [Length] {this.state.metadata.characteristics.Length.value}
    //         </div>
    //         <div className="fit-tag">
    //       [Fit] {this.state.metadata.characteristics.Fit.value}
    //         </div>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       [Rating & Reviews]
    //       <div className="characterboxB">
    //       [Characteristics]
    //         <div className="comfort-tag">
    //       [Comfort] {this.state.metadata.characteristics.Quality.value}
    //         </div>
    //         <div className="quality-tag">
    //       [Quality] {this.state.metadata.characteristics.Quality.value}
    //         </div>
    //         <div className="size-tag">
    //       [Size] {this.state.metadata.characteristics.Quality.value}
    //         </div>
    //         <div className="width-tag">
    //       [Width] {this.state.metadata.characteristics.Width.value}
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  }
}

export default RatingBreakdown;



// console.log('Characteristics', result.data.characteristics.Size.value);
// this.setState({width: null, size: null, fit: null, length: null});
// this.setState({product_id: result.data.product_id, rating: result.data.rating, recommended: result.data.recommended, comfort: result.data.characteristics.Comfort.value, quality: result.data.characteristics.Quality.value});
// if (result.data.characteristics.Fit.value !== undefined) {
//   this.setState({fit: result.data.characteristics.Fit.value});
// }
// if (result.data.characteristics.Width.value) {
//   this.setState({width: result.data.characteristics.Width.value});
// }
// if (result.data.characteristics.Size.value) {
//   this.setState({size: result.data.characteristics.Size.value});
// }
// if (result.data.characteristics.Length.value) {
//   this.setState({length: result.data.characteristics.Length.value});
// }
// console.log('Stateful Comfort', this.state.comfort);
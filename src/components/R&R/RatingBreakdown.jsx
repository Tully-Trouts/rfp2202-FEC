/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: null,
      rating: {},
      recommended: {},
      fit: null,
      length: null,
      comfort: null,
      quality: null,
      width: null,
      size: null,
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
        this.setState({width: null, size: null, fit: null, length: null});
        this.setState({product_id: result.data.product_id, rating: result.data.rating, recommended: result.data.recommended});
        console.log('------->HERE<-------', result.data);
        console.log('TEST1', this.state.metadata.characteristics.Quality.value);
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
        Need to make Changes
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
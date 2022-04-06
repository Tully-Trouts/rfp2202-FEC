/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: {
        product_id: '111111',
        ratings: {
          2: '1',
          4: '1',
          5: '1'
        },
        recommended: {
          false: '1',
          true: '1'
        },
        characteristics: {
          Fit: {
            id: 111111,
            value: '1'
          },
          Length: {
            id: 111111,
            value: '1'
          },
          Comfort: {
            id: 111111,
            value: '1'
          },
          Quality: {
            id: 111111,
            value: '1'
          }
        }
      },
      shoes: false,
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
        this.setState({metadata: result.data});
        console.log('TEST1', this.state.metadata.characteristics.Quality.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.retrieveMetaList(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.retrieveMetaList(this.props.productId);
    }
  }

  render() {
    if (this.state.shoes === false) {
      return (
        <div>
          [Rating & Reviews]
          <div className="characterboxA">
          [Characteristics]
            <div className="comfort-tag">
            [Comfort] {this.state.metadata.characteristics.Comfort.value}
            </div>
            <div className="quality-tag">
            [Quality] {this.state.metadata.characteristics.Quality.value}
            </div>
            <div className="length-tag">
            [Length] {this.state.metadata.characteristics.Length.value}
            </div>
            <div className="fit-tag">
          [Fit] {this.state.metadata.characteristics.Fit.value}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          [Rating & Reviews]
          <div className="characterboxB">
          [Characteristics]
            <div className="comfort-tag">
          [Comfort] {this.state.metadata.characteristics.Quality.value}
            </div>
            <div className="quality-tag">
          [Quality] {this.state.metadata.characteristics.Quality.value}
            </div>
            <div className="size-tag">
          [Size] {this.state.metadata.characteristics.Quality.value}
            </div>
            <div className="width-tag">
          [Width] {this.state.metadata.characteristics.Width.value}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default RatingBreakdown;
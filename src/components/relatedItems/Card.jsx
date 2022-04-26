import React from 'react';
import axios from 'axios';
import ComparisonModal from './ComparisonModal';
import { Button, StarReview } from '../styledComponents';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compProduct: {},
      originalPrice: '',
      salePrice: '',
      previewImg: '',
      avgRating: '',
      show: false,
      notFoundUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png'
    };

    // this.getAllInfo = this.getAllInfo.bind(this);
    // this.getAvgRating = this.getAvgRating.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  // componentDidMount() {
  //   this.getAllInfo(this.props.productId);
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.productId !== this.props.productId) {
  //     this.getAllInfo(this.props.productId);
  //   }
  // }

  handleModalClick() {
    //console.log('handleModalClick is triggering');
    this.setState({show: !this.state.show});
  }

  render() {

    if (this.props.info) {
      //console.log('this.props.info:::', this.props.info);
      const { isOutfit, productId, currProduct, getProductById, handleRemoveOutfit } = this.props;
      const { compProduct, originalPrice, salePrice, previewImg, avgRating } = this.props.info;
      const { show, notFoundUrl } = this.state;
      const { name, category } = compProduct;

      if (!isOutfit) {
        return (
          <div>
            <div className="header end">
              <button className="sm card-button absolute" type="button" name="modal-open" onClick={this.handleModalClick}>&#9734;</button>
            </div>
            <ComparisonModal currProduct={currProduct} compProduct={compProduct} show={show} handleModalClick={this.handleModalClick} />
            <div className="inner-card clickable" onClick={(event) => ( getProductById(productId, event))}>
              <img className="preview-image" src={previewImg || notFoundUrl}/>
              <div className="card-info">
                <h6>{category}</h6>
                <div>{name}</div>
                <div>{salePrice ? <><span style={{ color: 'red' }}>{`$${salePrice}  `}</span><span style={{ textDecoration: 'line-through' }}>{`$${originalPrice}`}</span></> : `$${originalPrice}`}</div>
                <div>{avgRating !== 'no reviews yet' ? <StarReview stars={avgRating} /> : <div style={{ height: '23.82px' }}></div>}</div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="header end">
              <button className="sm card-button close-remove absolute" type="button" onClick={(e) => handleRemoveOutfit(e, productId)}>X</button>
            </div>
            <div className="inner-card">
              <img className="preview-image" src={previewImg || notFoundUrl}/>
              <div className="card-info">
                <h6>{category}</h6>
                <div>{name}</div>
                <div>{salePrice ? <><span style={{ color: 'red' }}>{`$${salePrice}  `}</span><span style={{ textDecoration: 'line-through' }}>{`$${originalPrice}`}</span></> : `$${originalPrice}`}</div>
                <div>{avgRating !== 'no reviews yet' ? <StarReview stars={avgRating} /> : <div style={{ height: '22.82px' }}></div>}</div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Card;

// <div>Rating: {avgRating !== 'no reviews yet' ? `${avgRating}/5` : avgRating}</div>


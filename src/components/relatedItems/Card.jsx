import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="inner-card" onClick={this.props.getProductById(this.props.productId)}>
        <span className="preview-image">[preview image]</span>
        <div className="product-info">
          <h6 className="category">CATEGORY</h6>
          <h6>{this.props.productId}</h6>
          <div className="name">[product name]</div>
          <div className="price">[price]</div>
          <div className="rating"> [rating]</div>
        </div>
      </div>
    );
  }
}

export default Card;
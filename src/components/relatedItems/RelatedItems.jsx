import React from 'react';
import CardList from './CardList';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log('productId in RI:::', this.props.productId);
    return (
      <div id="related-items-container">
        <h5>RELATED PRODUCTS</h5>
        <div className="card-list">
          <CardList productId={this.props.productId} getProductById={this.props.getProductById}/>
        </div>
      </div>

    );
  }
}

export default RelatedItems;
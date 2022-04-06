import React from 'react';
import CardList from './CardList';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { product, getProductById } = this.props;
    return (
      <div id="related-items-container">
        <h5>RELATED PRODUCTS</h5>
        <div className="card-list">
          <CardList product={product} getProductById={getProductById}/>
        </div>
      </div>

    );
  }
}

export default RelatedItems;
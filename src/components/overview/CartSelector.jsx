import React from 'react';

var CartSelector = ({skus}) => {
  var sizes = (skus) => {
    return (skus ?
      Object.keys(skus).map((element) => (
        <option key={element}>{skus[element].size}</option>
      )) :
      <option>OUT OF STOCK</option>);
  };
  return (
    <div className="overview overview-cart-selector">
      [cart selector]
      <div className="overview sm cart-selector">
        <select>
          <option defaultValue={true}>Select Size</option>
          {sizes(skus)}
        </select>
      </div>
    </div>
  );
};

export default CartSelector;

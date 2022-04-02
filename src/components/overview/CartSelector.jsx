import React from 'react';

var CartSelector = ({skus}) => {
  const [skuList, setSkuList] = React.useState([]);

  if (!!skus) {
    setSkuList(skus);
  }

  return (
    <div className="overview overview-cart-selector">
      [cart selector]
      <div className="overview sm cart-selector">
        <select>
          {skuList.map((element) => (<option>{element.size}</option>))}
        </select>
      </div>
    </div>
  );
};

export default CartSelector;

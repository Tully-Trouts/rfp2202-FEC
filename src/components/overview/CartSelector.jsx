import React from 'react';

var CartSelector = ({skus}) => {
  const [available, setAvailable] = React.useState(false);
  let skuList = [];

  React.useEffect(() => {
    setAvailable(!!skus);
  });
  //{skuList.map((element) => (<option>{element.size}</option>))}
  return (
    <div className="overview overview-cart-selector">
      [cart selector]
      <div className="overview sm cart-selector">
        <select>
          {available ?
            Object.keys(skus).map((element) => (<option>{skus[element].size}</option>)) :
            <option>sold out</option>}
        </select>
      </div>
    </div>
  );
};

export default CartSelector;

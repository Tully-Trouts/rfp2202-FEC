import React from 'react';

var CartSelector = ({skus}) => {
  const [selectedSku, setSelectedSku] = React.useState({});
  //const [skuList, setSkuList] = React.useState([]);
  const [quantities, setQuantities] = React.useState(0);

  var getSizeOptions = (skus) => {
    return (skus ?
      Object.keys(skus).map((element) => (
        <option
          key={element}
          value={element}>
          {skus[element].size}
        </option>
      )) :
      <option>OUT OF STOCK</option>); // YELLING
  };

  var getQtyOptions = (qty) => {
    const qtyList = [...Array(qty)];
    return (qtyList.map((element, index) => (
      <option
        key={index}
        value={index + 1}>
        {index + 1}
      </option>
    )));
  };

  var selectSku = (event) => {
    const sku = event.target.value;
    console.log('selected sku:', sku);
    setSelectedSku(sku);
    console.log('quantity available:', skus[sku].quantity);
    setQuantities(skus[sku].quantity);
  };

  return (
    <div className="overview overview-cart-selector">
      [cart selector]
      <div className="overview sm cart-selector">
        <select
          role="listbox"
          aria-label="size"
          onChange={(e) => selectSku(e)}>
          <option defaultValue={true}>Select Size</option>
          {getSizeOptions(skus)}
        </select>
        <select
          role="listbox"
          aria-label="quantity">
          <option defaultValue={true} value="">-</option>
          {getQtyOptions(quantities)}
        </select>
      </div>
      <div className="overview sm cart-selector-buttons">
        <span
          role="button"
          aria-label="add-to-cart"
          className="overview sm btn add-to-cart-btn">Add to cart</span>
      </div>
    </div>
  );
};

export default CartSelector;

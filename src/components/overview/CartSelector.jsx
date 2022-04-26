import axios from 'axios';
import React from 'react';
import { Button } from '../styledComponents';

var CartSelector = ({skus}) => {
  const [selectedSku, setSelectedSku] = React.useState({});
  //const [skuList, setSkuList] = React.useState([]);
  const [quantities, setQuantities] = React.useState(0);
  const [selectedQty, setSelectedQty] = React.useState(0);

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
    if (event.target.value === '') {
      //console.log('No size selected!');
      setQuantities(0);
      setSelectedSku({});
    } else {
      const sku = event.target.value;
      //console.log('selected sku:', sku);
      setSelectedSku(sku);
      //console.log('quantity available:', skus[sku].quantity);
      setQuantities(skus[sku].quantity);
    }
  };

  var addToCart =  (sku, qty) => {
    const payload = {
      'sku_id': sku,
      'count': qty,
    };
    axios.post('/api/cart', payload)
      .then((res) => {
        //console.log('Cart:', res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <div className="overview sm overview-cart-selector">
      <div className="overview sm cart-selector">
        <select
          role="listbox"
          aria-label="size"
          className="cart-selector size-selector"
          onChange={(e) => selectSku(e)}>
          <option defaultValue={true} value="">Select Size</option>
          {getSizeOptions(skus)}
        </select>
        <select
          role="listbox"
          aria-label="quantity"
          className="cart-selector quantity-selector"
          onChange={(e) => setSelectedQty(e.target.value)}>
          <option defaultValue={true} value={0}>-</option>
          {getQtyOptions(quantities)}
        </select>
      </div>
      <div className="overview sm cart-selector-buttons">
        <Button
          size={4}
          aria-label="add-to-cart"
          onClick={() => { addToCart(selectedSku, selectedQty); }}>
          Add to cart
        </Button>
        <Button
          size={1}
          aria-label="save">
          &#9734;
        </Button>
      </div>
    </div>
  );
};

export default CartSelector;

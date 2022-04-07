import React from 'react';
import Card from './Card';

const OutfitList = ({ product }) => {
  // how do I decided which cards to return and what to pass in?

  const [outfitList, setOutfitList] = React.useState(null);
  const [localStorageSize, setLocalStorageSize] = React.useState(localStorage.length);

  let handleRemoveOutfit = (e, productId) => {
    localStorage.removeItem(productId);
    setLocalStorageSize(localStorage.length);
  };
  handleRemoveOutfit = handleRemoveOutfit.bind(this);

  const addProductToOutfit = (id) => {
    if (id) {
      localStorage.setItem([product.id], JSON.stringify(product));
      setLocalStorageSize(localStorage.length);
    }
  };

  React.useEffect(() => {

    console.log('use effect triggers');

    // generate the card list from localStorage
    // refactor: definitely not the most efficient way to be doing this
    const currentOutfits = Object.keys(localStorage).map(productId => {
      return (
        <div className="card" key={productId}>
          <Card isOutfit={true} productId={productId} handleRemoveOutfit={handleRemoveOutfit}/>
        </div>
      );
    });

    setOutfitList(currentOutfits);

  }, [localStorageSize]);



  return (
    <div id="outfit-list-container">
      <h5>OUTFIT LIST</h5>
      <div className="card-list">
        <div className="card">
          <button onClick={() => addProductToOutfit(product.id)}>Add to outfit</button>
        </div>
        <>{outfitList}</>
      </div>
    </div>
  );
};

export default OutfitList;
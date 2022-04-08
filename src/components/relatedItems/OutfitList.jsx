import React from 'react';
import Card from './Card';

const OutfitList = ({ product }) => {

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

  // Need to style the Add to outfit card correctly
  return (
    <div id="outfit-list-container">
      <h5>YOUR OUTFIT</h5>
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
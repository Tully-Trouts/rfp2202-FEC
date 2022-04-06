import React from 'react';
import Card from './Card';

const OutfitList = ({ product }) => {
  // how do I decided which cards to return and what to pass in?

  const [outfitList, setOutfitList] = React.useState(null);


  const addProductToOutfit = (id) => {
    // need to check if product is currently in localStorage
    console.log('id:::', id);

    if (id) {
      localStorage.setItem([product.id], JSON.stringify(product));
    }

    console.log('product:::', product);

    console.log('window.localStorage:::', window.localStorage);
  };

  React.useEffect(() => {

    console.log('use effect triggers');

    // generate the card list from localStorage

    const currentOutfits = Object.keys(localStorage).map(productId => {
      return (
        <div className="card">
          <Card key={productId} productId={productId}/>
        </div>
      );
    });

    setOutfitList(currentOutfits);

  }, []);



  return (
    <div id="related-items-container">
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
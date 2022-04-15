import React from 'react';
import Card from './Card';
import axios from 'axios';
import { Button } from '../styledComponents';

const OutfitList = ({ product }) => {

  const [outfitList, setOutfitList] = React.useState([]);
  const [localStorageSize, setLocalStorageSize] = React.useState(localStorage.length);

  let handleRemoveOutfit = (e, productId) => {
    console.log('outfit clicking');
    localStorage.removeItem(productId);
    setOutfitList([]);
    setLocalStorageSize(localStorage.length);
  };

  const addProductToOutfit = (id) => {
    if (id) {
      localStorage.setItem([product.id], JSON.stringify(product));
      setLocalStorageSize(localStorage.length);
    }
  };

  const getAvgRating = (ratings) => {
    let sum = 0;
    let totalRatings = 0;
    for (let star in ratings) {
      let count = Number(ratings[star]);
      sum += star * count;
      totalRatings += count;
    }
    let avgRating = Math.round((sum / totalRatings) * 100) / 100;
    return avgRating || 'no reviews yet';
  };

  const getAllInfo = (productId) => {
    return axios.get(`api/products/${productId}`)
      .then((response) => {
        const compProduct = response.data;
        return axios.get(`api/products/${productId}/styles`)
          .then((response) => {
            let results = response.data.results;
            let defaultStyle = null;

            // if the product doesn't have a default style, set default to last style in results
            defaultStyle = results.find((element, index) => element['default?'] || index === (results.length - 1));

            const originalPrice = defaultStyle.original_price;
            const salePrice = defaultStyle.sale_price;

            // the first image in the set will be displayed as the main image
            const previewImg = defaultStyle.photos[0].thumbnail_url;

            return axios.get('api/reviews/meta', {
              params: {
                'product_id': productId,
              }
            })
              .then((response) => {
                let avgRating = getAvgRating(response.data.ratings);
                return {
                  compProduct: compProduct,
                  originalPrice: originalPrice,
                  salePrice: salePrice,
                  previewImg: previewImg,
                  avgRating: avgRating,
                };
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    // refactor: definitely not the most efficient way to be doing this
    console.log('Heyy outfits rendering');
    Object.keys(localStorage).map(productId => {
      getAllInfo(productId)
        .then((info) => {
          console.log('from outfitlist:', info);
          return (
            <div className="card" key={productId}>
              <Card isOutfit={true}
                currProduct={product}
                productId={productId}
                info={info}
                handleRemoveOutfit={handleRemoveOutfit}/>
            </div>
          );
        })
        .then((renderedOutfit) => {
          setOutfitList((previousOutfitList) => [...previousOutfitList, renderedOutfit]);
        });
    });

  }, [localStorageSize]);

  // Need to style the Add to outfit card correctly
  return (
    <div id="outfit-list-container">
      <h5>YOUR OUTFIT</h5>
      <div className="card-list">
        <div className="card">
          <div className="inner-card clickable" onClick={() => addProductToOutfit(product.id)}>
            <img className="preview-image" src="https://upload.wikimedia.org/wikipedia/commons/5/53/WP20Symbols_PLUS.svg"/>
            <div className="card-info">
              <h6>Add to Outfit</h6>
              {/* <div className="hidden">$Priceless</div>
              <div className="hidden">Rating: 10/10</div> */}
              <div className="fixedHeight"></div>
            </div>
          </div>
          {/* <Button size={1} aria-label="open" onClick={() => addProductToOutfit(product.id)}>Add to outfit</Button> */}
        </div>
        <>{outfitList}</>
      </div>
    </div>
  );
};

export default OutfitList;
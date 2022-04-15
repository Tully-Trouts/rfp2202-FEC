import React from 'react';
import Card from './Card';
import axios from 'axios';
import { Button } from '../styledComponents';

const OutfitList = ({ product }) => {

  const [outfitList, setOutfitList] = React.useState([]);

  let handleRemoveOutfit = (e, productId) => {
    const newOutfitList = outfitList;
    newOutfitList.filter(div => {
      return div.key !== productId;
    });
    localStorage.removeItem(productId);
    setOutfitList(newOutfitList);
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

  const addProductToOutfit = (productId) => {
    console.log('triggering addProductToOutfit');
    if (productId) {
      getAllInfo(productId)
        .then(info => {
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
        .then(newItem => {
          localStorage.setItem([productId], JSON.stringify(productId));
          setOutfitList((previousOutfitList) => [...previousOutfitList, newItem]);
        });
    }
  };

  React.useEffect(() => {
    const outfitProductIds = outfitList.map((div) => div.key);
    Object.keys(localStorage).forEach((productId) => {
      if (!outfitProductIds.includes(productId)) {
        getAllInfo(productId)
          .then(info => {
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
          .then(newItem => {
            setOutfitList((previousOutfitList) => [...previousOutfitList, newItem]);
          });
      }
    });
  }, [product.id]);

  return (
    <div id="outfit-list-container">
      <h5>YOUR OUTFIT</h5>
      <div className="card-list">
        <div className="card">
          <div className="inner-card clickable" onClick={() => addProductToOutfit(product.id)}>
            <img className="preview-image not-cover" src="https://upload.wikimedia.org/wikipedia/commons/f/f7/PlusCM128.svg"/>
            <div className="card-info">
              <h6>Add to Outfit</h6>
              <div className="hidden">$Priceless</div>
              <div className="hidden">Rating: 10/10</div>
              <div className="fixedHeight"></div>
            </div>
          </div>
        </div>
        <>{outfitList}</>
      </div>
    </div>
  );
};

export default OutfitList;
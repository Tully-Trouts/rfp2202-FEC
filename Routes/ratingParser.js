const axios = require('axios');

const parseProductRating = (metaData, product) => {
  let [totalRatings, total] = [0, 0];
  for (let star = 1; star <= 5; star += 1) {
    total += Number(metaData.ratings[star] || 0) * star;
    totalRatings += Number(metaData.ratings[star] || 0);
  }
  const avgRating = totalRatings === 0 ? null : (total / totalRatings).toFixed(2);
  product.averageRating = avgRating;
  return product;
};

module.exports = (req, res, next) => {
  if (req.url === '/' && req.method === 'GET') {
    console.log('\nAverage rating middleware running on:', req.originalUrl);
    axios.get(process.env.API_URL + '/reviews/meta', {
      headers: { Authorization: process.env.API_KEY },
      params: { 'product_id': req.params.productId },
    })
      .then((metaResponse) => {
        axios.get(process.env.API_URL + '/products/' + req.params.productId, {
          headers: { Authorization: process.env.API_KEY },
        })
          .then((productResponse) => {
            const newProduct = parseProductRating(metaResponse.data, productResponse.data);
            console.log('Average rating appended to product:', newProduct);
            res.status(265).send(newProduct);
          });
      })
      .catch((err) => {
        console.log('(Failed)\n', err);
        res.status(500).send(err);
      });
  } else {
    console.log(req.originalUrl, 'skipping rating parser\n');
    next();
  }
};
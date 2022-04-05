require('dotenv').config();
const express = require('express');
const axios = require('axios');
// const path = require('path');

// this is weird
const console = require('console');

const app = express();

app.use(express.json());

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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

app.get('/api/products/:productId', (req, res) => {
  console.log('\nAverage rating middleware running. . .\n');
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
});

app.use('/api/:loc', (req, res) => {
  console.log('\n\n', req.originalUrl.split('/api')[1], '\n\n');
  const location = req.originalUrl.split('/api')[1];
  axios(process.env.API_URL + location, {
    headers: { Authorization: process.env.API_KEY },
    method: req.method,
    data: req.body,
  })
    .then((response) => {
      console.log(response.data);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('Failed\n', err);
      res.status(500).send(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

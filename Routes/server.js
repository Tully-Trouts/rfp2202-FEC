require('dotenv').config();
const express = require('express');
const axios = require('axios');
// const path = require('path');

// this is weird
const console = require('console');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API_URL='https://app-hrsei-api.herokuapp.com/api/fec2/rfp//products
// API_URL='https://app-hrsei-api.herokuapp.com/api/fec2/rfp + products

// app.get('/:location', (req, res) => {
//   const apiUrl = process.env.API_URL + req.params.location;
//   axios.get(apiUrl, {
//     headers: { Authorization: process.env.API_KEY },
//   })
//     .then((response) => {
//       console.log(response.data);
//       res.send(response.data);
//     })
//     .catch((err) => {
//       console.log('failed', err);
//     });
// });

app.use('/:loc', (req, res) => {
  axios(process.env.API_URL + req.params.loc, {
    headers: { Authorization: process.env.API_KEY },
    method: req.method,
    data: req.data,
  })
    .then((response) => {
      console.log(response.data);
      res.status(211).send(response.data);
    })
    .catch((err) => {
      console.log('Failed\n', err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

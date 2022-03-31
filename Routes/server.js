require('dotenv').config();
const express = require('express');
const axios = require('axios');
// const path = require('path');

// this is weird
const console = require('console');

const app = express();

app.use(express.json());

// app.set('Authorization', process.env.API_KEY);

// process.env.API_URL

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API_URL='https://app-hrsei-api.herokuapp.com/api/fec2/rfp//products
// API_URL='https://app-hrsei-api.herokuapp.com/api/fec2/rfp + products
app.get('/:location', (req, res) => {
  const apiUrl = process.env.API_URL + req.params.location;
  axios.get(apiUrl, {
    headers: { Authorization: process.env.API_KEY },
  })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('failed', err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

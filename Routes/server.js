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

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(6000, () => {
  console.log('Server started at : 5000');
});
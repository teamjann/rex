const express = require('express');
const bodyParser = require('body-parser');
const {
  promiseQuery, insertQuery, updateQuery, deleteQuery,
} = require('../database/index');
const { FETCH_BOOKS } = require('../database/queries');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/hello', (req, res) => {
  res.json('hey');
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

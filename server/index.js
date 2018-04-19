const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  promiseQuery,
  insertQuery,
  updateQuery,
  deleteQuery
} = require('../database/index');
const {
  FETCH_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  ADD_REC,
  UPDATE_RECOMMENDATION
} = require('../database/queries');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/u/:userId/:category', (req, res) => {
  const { userId, category } = req.params;
  promiseQuery(FETCH_BOOKS(userId, category))
    .then(books => {
      const parsedBooks = books.reduce((bookItems, recommendation) => {
        const {
          rec_id,
          recommender_id,
          user_id,
          recommender_name,
          comment,
          item_id,
          date_added,
          title,
          thumbnail_url,
          description,
          url,
          status,
          user_rating
        } = recommendation;

        const recEntry = {
          recommender_id,
          recommender_name,
          comment,
          date_added
        };

        const book = {
          title,
          thumbnail_url,
          description,
          url,
          status,
          user_rating
        };

        if (item_id in bookItems) {
          bookItems[item_id].recommendations.push(recEntry);
        } else {
          bookItems[item_id] = {
            book,
            recommendations: [recEntry]
          };
        }

        return bookItems;
      }, {});

      res.json(parsedBooks);
      res.end();
    })
    .catch(err => res.end('404', err));
});

app.post('/u/:userId/:category', (req, res) => {
  const { userId, category } = req.params;
  console.log('req.body', req.body);

  insertQuery(ADD_REC(req.body))
    .then(sqlResponse => res.json({ inserted: 'success' }))
    .catch(err => console.log(err));
});

// UPDATE STATUS / RATING FOR RECOMMENDATION
app.put('/u/:userId/:category/:itemId', (req, res) => {
  const { userId, category, itemId } = req.params;
  const { status, rating } = req.body;

  updateQuery(
    UPDATE_RECOMMENDATION({
      userId,
      category,
      itemId,
      status,
      rating
    })
  )
    .then(sqlRes => {
      console.log(sqlRes);
      res.send('success');
    })
    .catch(err => console.log('could not update'));
});

// DELETE RECOMMENDATIONS FOR A BOOK
app.delete('/u/:userId/:category/:itemId', (req, res) => {
  const { userId, category, itemId } = req.params;

  deleteQuery(DELETE_BOOK({ userId, category, itemId }))
    .then(sqlRes => res.json({ deleted: itemId }))
    .catch(err => console.log(err));
});

// SERVE REACT INDEX.HTML FOR ALL UNHANDLED REQUESTS
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});

// {
//   "rec_id": 6,
//   "id": 2,
//   "recommender_id": null,
//   "user_id": 3,
//   "recommender_name": "Bob",
//   "comment": "read this",
//   "item_id": 2,
//   "date_added": "2018-04-10T21:03:13.518Z",
//   "category": "books",
//   "title": "Harry Potter",
//   "thumbnail_url": "somesite",
//   "description": "harry potter",
//   "url": "potterlink"
// }

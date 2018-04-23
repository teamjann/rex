const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const authObj = {};

const {
  promiseQuery,
  insertQuery,
  updateQuery,
  deleteQuery,
  validateQuery,
} = require('../database/index');
// SQL queries
const {
  FIND_USER,
  ADD_USER,
  FETCH_BOOKS,
  CHECK_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  ADD_REC,
  ADD_REC_AND_BOOK,
  UPDATE_RECOMMENDATION,
  ADD_REC_TO_EXISTING_BOOK,
  CHECK_EXISTING_REC,
} = require('../database/queries');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false,
}));

app.use(express.static(`${__dirname}/../client/dist`));

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  promiseQuery(FIND_USER(username))
    .then((sqlResponse) => {
      const { id, password: hash } = sqlResponse[0];
      bcrypt.compare(password, hash, (err, doesMatch) => {
        if (err) {
          console.error(err);
        } else if (doesMatch) {
          const key = uuidv4();
          authObj[key] = id;
          req.session.uuid = key;
          res.send({ uuid: key });
        } else {
          res.send('login failed');
        }
      });
    })
    .catch((err) => {
      console.error(err);
      // send 'invalid username' message;
    });
});

// SIGNUP
app.post('/signup', (req, res) => {
  const {
    username, password, firstName, lastName,
  } = req.body;
  promiseQuery(FIND_USER(username))
    .then(() => {
      console.log(`signup validation err, username '${username}' already exists`);
    })
    .catch(() => {
      bcrypt.hash(password, 10, (err, hash) => {
        insertQuery(ADD_USER(username, hash, firstName, lastName)).then((sqlResponse) => {
          const { id } = sqlResponse[0][0];
          const key = uuidv4();
          authObj[key] = id;
          res.send({ uuid: id });
          // create session
        });
      });
    });
});

// GET BOOKS AND RECOMMENDATIONS FOR USER
app.get('/u/:userId/:category', (req, res) => {
  const { userId, category } = req.params;

  promiseQuery(FETCH_BOOKS(userId, category))
    .then((books) => {
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
          user_rating,
        } = recommendation;

        const recEntry = {
          recommender_id,
          recommender_name,
          comment,
          date_added,
        };

        const book = {
          title,
          thumbnail_url,
          description,
          url,
          status,
          user_rating,
        };

        if (item_id in bookItems) {
          bookItems[item_id].recommendations.push(recEntry);
        } else {
          bookItems[item_id] = {
            book,
            recommendations: [recEntry],
          };
        }

        return bookItems;
      }, {});
      res.json(parsedBooks);
      res.end();
    })
    .catch(err => res.end('404', err));
});

// ADD NEW RECOMMENDATION
app.post('/u/:userId/:category', (req, res) => {
  const { category } = req.params;
  const {
    apiId, firstName, lastName, comments,
  } = req.body;

  // Shortest way we've found of getting the UUID, for some reason
  const sessions = req.sessionStore.sessions;
  let userId;

  for (const [key, val] of Object.entries(sessions)) {
    const uuid = JSON.parse(sessions[key]).uuid;
    if (uuid) {
      userId = authObj[uuid];
    }
  }

  promiseQuery(CHECK_BOOK({ apiId }))
    .then((bookIdObj) => {
      const bookId = bookIdObj[0].id;

      validateQuery(CHECK_EXISTING_REC({ userId, apiId })).then((exist) => {
        const recommendationsExist = exist[0][0].exists;

        if (recommendationsExist) {
          res.status(404).send('Already exists');
        } else {
          const recommendationInfo = {
            firstName,
            lastName,
            comments,
            category,
            userId,
            bookId,
          };

          insertQuery(ADD_REC(recommendationInfo))
            .then(sqlResponse => res.json({ inserted: 'success' }))
            .catch(err => console.log(err));
        }
      });
    })
    .catch((bookNotInDB) => {
      insertQuery(ADD_REC_AND_BOOK(req.body))
        .then(sqlResponse => res.json({ inserted: 'success' }))
        .catch(err => console.log(err));
    });
});

// ADD NEW RECOMMENDATION
app.post('/u/:userId/:category/:bookId', (req, res) => {
  const { userId, category, bookId } = req.params;
  const {
    id, firstName, lastName, comments,
  } = req.body;
  const recInfo = {
    userId,
    category,
    id,
    firstName,
    lastName,
    comments,
  };
  insertQuery(ADD_REC_TO_EXISTING_BOOK(recInfo))
    .then(sqlResponse => res.json({ inserted: 'success' }))
    .catch(err => console.log(err));
});

app.get('/auth', (req, res) => {
  if (req.session.uuid) {
    res.send({ uuid: req.session.uuid });
  } else {
    res.send('not logged in');
  }
});

// UPDATE STATUS & RATING FOR RECOMMENDATION
app.put('/u/:userId/:category/:itemId', (req, res) => {
  const { userId, category, itemId } = req.params;
  const { status, rating } = req.body;

  updateQuery(UPDATE_RECOMMENDATION({
    userId,
    category,
    itemId,
    status,
    rating,
  }))
    .then((sqlRes) => {
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});

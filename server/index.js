const express = require('express');
const passportSetup = require('./passport-setup.js');
const bodyParser = require('body-parser');
const path = require('path');
// const session = require('express-session');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./auth-routes.js');
require('dotenv').config();

const apiHelpers = require('./apiHelpers');

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

// Middleware to retrieve userId from request
// const getUserId = (req, res, next) => {
//   const { sessions } = req.sessionStore;

//   for (const [key, val] of Object.entries(sessions)) {
//     const uuid = JSON.parse(sessions[key]).uuid;
//     if (uuid) {
//       req.userId = authObj[uuid];
//       next();
//     }
//   }
// };

// Middleware to check if user logged in
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    // if logged in
    next();
  }
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//   secret: 'keyboard cat',
//   cookie: { maxAge: 24 * 60 * 60 * 1000 },
//   resave: true,
//   saveUninitialized: false,
// }));
app.use(express.static(`${__dirname}/../client/dist`));

// Use cookie session for auth
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['hellothisisrandom'],
  }),
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

/* -------------------------------------------------------------------
--------------------------------------------------------------------*/

// MovieDb API
app.post('/movie', (req, res) => {
  apiHelpers
    .getMoviesByTitle(req.body.title)
    .then(result => {
      res.contentType('application/json');
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

// Music songs API
app.post('/songs', (req, res) => {
  apiHelpers
    .getSongsByTitle(req.body.song)
    .then(result => {
      //console.log('server', result)
      res.contentType('application/json');
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

// Music song API
app.post('/song', (req, res) => {
  apiHelpers
    .getSongDetailsById(req.body.song)
    .then(result => {
      res.contentType('application/json');
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

// YELP API
app.post('/food', (req, res) => {
  apiHelpers.getFoodByName(req.body.food, (data, err) => {
    res.contentType('application/json');
    if (err === null) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

// YELP API
app.post('/review', (req, res) => {
  apiHelpers.getReviewById(req.body.name, (data, err) => {
    res.contentType('application/json');
    if (err === null) {
      res.send(data);
    } else {
      res.send(err);
    }
  })
});
/* -------------------------------------------------------------------
--------------------------------------------------------------------*/

// LOGIN
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   promiseQuery(FIND_USER(username))
//     .then((sqlResponse) => {
//       const { id, password: hash } = sqlResponse[0];
//       bcrypt.compare(password, hash, (err, doesMatch) => {
//         if (err) {
//           console.error(err);
//         } else if (doesMatch) {
//           const key = uuidv4();
//           authObj[key] = id;
//           req.session.uuid = key;
//           res.send({ isAuthenticated: true, username });
//         } else {
//           res.send({ isAuthenticated: false });
//         }
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       // send 'invalid username' message;
//     });
// });

// SIGNUP
// app.post('/signup', (req, res) => {
//   const {
//     username, password, firstName, lastName,
//   } = req.body;
//   promiseQuery(FIND_USER(username))
//     // .then(() => {
//     //   console.log(`signup validation err, username '${username}' already exists`);
//     // })
//     .then(() => {
//       bcrypt.hash(password, 10, (err, hash) => {
//         insertQuery(ADD_USER(username, hash, firstName, lastName)).then((sqlResponse) => {
//           const { id } = sqlResponse[0][0];
//           const key = uuidv4();
//           authObj[key] = id;
//           req.session.uuid = key;
//           res.send({ isAuthenticated: true, username });
//         });
//       });
//     });
// });

// GET BOOKS AND RECOMMENDATIONS FOR USER
app.get('/u/:userId/:category', isLoggedIn, (req, res) => {
  console.log('params on get', req.params)
  const category = req.params.category;
  const userId = req.params.userId;

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

// ADD RECOMMENDATION WHEN BOOKID KNOWN
app.post('/r/:category/:bookId', isLoggedIn, (req, res) => {
  const { category, bookId } = req.params;
  const { id, firstName, lastName, comments } = req.body;
  const { userId } = req;
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

// ADD NEW RECOMMENDATION
app.post('/u/:userId/:category/', isLoggedIn, (req, res) => {
  const category = req.params.category;
  const userId = req.params.userId;

  const bookInfo = JSON.parse(req.body.bookInfo);
  const { apiId, firstName, lastName, comments } = JSON.parse(req.body.bookInfo);

  console.log('adding recommendation');

  promiseQuery(CHECK_BOOK({ apiId }))
    .then(bookIdObj => {
      const bookId = bookIdObj[0].id;
      console.log('book in db');

      validateQuery(CHECK_EXISTING_REC({ userId, apiId })).then(exist => {
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
          console.log('ADD REC', recommendationInfo);
          insertQuery(ADD_REC(recommendationInfo))
            .then(sqlResponse => res.json({ inserted: 'success' }))
            .catch(err => console.log(err));
        }
      });
    })
    .catch(bookNotInDB => {
      insertQuery(ADD_REC_AND_BOOK({ ...bookInfo, userId }))
        .then(sqlResponse => res.json({ inserted: 'success' }))
        .catch(err => console.log(err));
    });
});

app.get('/auth', isLoggedIn, (req, res) => {
  const userObj = {
    firstName: req.user[0].first_name,
    userId: req.user[0].user_id,
  };

  res.status(200).send(userObj);
});

// app.get('/auth', (req, res) => {
//   if (req.session.passport.user[0][0].google_id) {
//     res.send({ isAuthenticated: true });
//   } else {
//     res.send({ isAuthenticated: false });
//   }
// });

// UPDATE STATUS & RATING FOR RECOMMENDATION
app.put('/u/:userId/:category/:itemId', isLoggedIn, (req, res) => {
  const { category, itemId } = req.params;
  const { status, rating } = req.body;
  const { userId } = req;

  updateQuery(
    UPDATE_RECOMMENDATION({
      userId,
      category,
      itemId,
      status,
      rating,
    }),
  )
    .then(sqlRes => {
      res.send('recommendation successfully updated');
    })
    .catch(err => console.log('could not update'));
});

// DELETE RECOMMENDATIONS FOR A BOOK
app.delete('/u/:userId/:category/:itemId', passport.session(), (req, res) => {
  const { category, itemId } = req.params;
  const { userId } = req;

  deleteQuery(DELETE_BOOK({ userId, category, itemId }))
    .then(sqlRes => res.json({ deleted: itemId }))
    .catch(err => console.log(err));
});

// SERVE REACT INDEX.HTML FOR ALL UNHANDLED REQUESTS
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});

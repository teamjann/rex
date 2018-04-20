var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var session = require("express-session");
var bcrypt = require('bcrypt');

const {
  promiseQuery,
  insertQuery,
  updateQuery,
  deleteQuery
} = require("../database/index");
const { FETCH_BOOKS, ADD_BOOK, ADD_REC, FIND_USER, ADD_USER } = require("../database/queries");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));



const checkAuth = function (req, res, next) {
  if (req.session.cookie.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const createSession = (req, username) => {
  req.session.cookie.user = username;
}

app.use(express.static(`${__dirname}/../client/dist`));

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  promiseQuery(FIND_USER(username))
    .then(userObj => {
      brypt.compare(password, userObj.password, (err, result) => {
        if (err) {

        } else {

        }
      });
    })
    .catch((err) => {
      console.log(err);
      // send 'invalid username' message;
    })
});

app.post('/signup', (req, res) => {
  const {username, password} = req.body;
  promiseQuery(FIND_USER(username))
    .then(() => {
      // send 'username already exists' message
    })
    .catch(() => {
      bcrypt.hash(password, 10, (err, hash) => {
        insertQuery(ADD_USER(username, hash))
          .then((sqlResponse) => {
            // retrieve user_id from sql
            // create session
          })
      });
    });
});

app.get("/u/:userId/:category", (req, res) => {
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
          url
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
          url
        };

        console.log(bookItems);

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

      console.log("parsedBooks = ", parsedBooks);

      res.json(parsedBooks);
      res.end();
    })
    .catch(err => res.end("404", err));
});

app.post("/u/:userId/:category", (req, res) => {
  const { userId, category } = req.params;
  console.log("req.body", req.body);

  insertQuery(ADD_REC(req.body))
    .then(sqlResponse => res.json({ inserted: "success" }))
    .catch(err => console.log(err));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
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

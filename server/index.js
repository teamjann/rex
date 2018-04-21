var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var session = require("express-session");
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

const authObj = {};

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
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(`${__dirname}/../client/dist`));

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  promiseQuery(FIND_USER(username))
    .then((sqlResponse) => {
      const { id, password: hash } = sqlResponse[0];
      bcrypt.compare(password, hash, (err, doesMatch) => {
        if (err) {
          console.error(err);
        } else {
          if (doesMatch) {
            const key = uuidv4();
            authObj[key] = id;
            req.session.uuid = key;
            res.send({uuid: key});
          } else {
            res.send('login failed');
          }
        }
      });
    })
    .catch((err) => {
      console.error(err);
      // send 'invalid username' message;
    })
});

app.post('/signup', (req, res) => {
  const {username, password, firstName, lastName} = req.body;
  promiseQuery(FIND_USER(username))
    .then(() => {
      console.log(`signup validation err, username '${username}' already exists`);
    })
    .catch(() => {
      bcrypt.hash(password, 10, (err, hash) => {
        insertQuery(ADD_USER(username, hash, firstName, lastName))
          .then((sqlResponse) => {
            const { id } = sqlResponse[0][0];
            const key = uuidv4();
            authObj[key] = id;
            res.send({uuid: id});
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
    .catch(err => res.end("404", err));
});

app.post("/u/:userId/:category", (req, res) => {
  const { userId, category } = req.params;
  console.log("req.body", req.body);

  insertQuery(ADD_REC(req.body))
    .then(sqlResponse => res.json({ inserted: "success" }))
    .catch(err => console.log(err));
});

app.get('/auth', (req, res) => {
  if (req.session.uuid) {
    res.send({ uuid: req.session.uuid });
  } else {
    res.send('not logged in');
  }
})

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
});

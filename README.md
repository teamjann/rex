# Rex

## Basics

Recommendation tracking application. Features:

* Sign in / authentication
* Loading books from Goodreads (Future: additional categories)
* Add books to recommendation list
* Take books off list
* Mark recommendations as completed and rate
* Check out recommendations
* Sort recommendations and show / hide completed

## To start the app

`npm install -g webpack`

`npm install`

`npm run react-dev`

`npm run server-dev`

## Development notes

* Backup of the database is included in `database/latest.dump` (see Heroku for notes to restore)
* API key left blank, needs GoodReads key

### Priorities

* Password needs to be blocked on login / signup
* Authentication: Passport for session tracking

## Stretch goals

* Additional categories
  * Additional APIs for categories (Movies from IMDB, Food from Yelp, etc...)
* User-to-user interaction:
  * Friending users
  * Sending users recommendations
  * Viewing friends recommendation lists
* Redux store for data
* React native / PWA

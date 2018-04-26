const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { insertQuery, promiseQuery } = require('../database/index');
const { ADD_GOOGLE_USER, FIND_GOOGLE_USER, FIND_AUTH_USER } = require('../database/queries');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  promiseQuery(FIND_AUTH_USER(user[1])).then((currentUser) => {
    done(null, currentUser);
  });
});

passport.use(new GoogleStrategy(
  {
    // options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: '449120765092-0kfl6dcdbfb6mlq3tudve29vco2orfmt.apps.googleusercontent.com',
    clientSecret: '7XxJbNBaa6So9fkCW0xxurIf',
  },
  (accessToken, refreshToken, profile, done) => {
    // check if user already exists in database
    promiseQuery(FIND_GOOGLE_USER(profile.id)).then((currentUser) => {
      if (currentUser.length > 0) {
        // already have user
        console.log(`user already in db: ${currentUser}`);
        done(null, currentUser);
      } else {
        // if not, create user
        insertQuery(ADD_GOOGLE_USER(profile.id, profile.displayName)).then((newGoogleUser) => {
          console.log(`New user created: ${newGoogleUser}`);
          done(null, newGoogleUser);
        });
      }
    });
  },
));

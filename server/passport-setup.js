const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { insertQuery, promiseQuery } = require('../database/index');
const { ADD_GOOGLE_USER, FIND_GOOGLE_USER, FIND_AUTH_USER } = require('../database/queries');

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
        done(null, currentUser);
      } else {
        // if not, create user
        insertQuery(ADD_GOOGLE_USER(profile.id, profile.displayName, profile.name.givenName)).then((newGoogleUser) => {
          done(null, newGoogleUser);
        });
      }
    });
  },
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  promiseQuery(FIND_GOOGLE_USER(user[0].google_id)).then((currentUser) => {
    done(null, currentUser);
  });
});

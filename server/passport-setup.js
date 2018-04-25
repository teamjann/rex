const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy(
  {
    // options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: '449120765092-0kfl6dcdbfb6mlq3tudve29vco2orfmt.apps.googleusercontent.com',
    clientSecret: '7XxJbNBaa6So9fkCW0xxurIf',
  },
  (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log(profile);
  },
));

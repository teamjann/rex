const request = require('request');
const yelp = require('yelp-fusion');


// move keys to env file
const keys = {
  movieAPI: {
    v3Auth: 'cb6f407ec46ef9ccfe352eca08e2a993',
  },
  yelpAPI: {
    clientID: 'eHPRlMklu15cUFLo2lfqpQ',
    APIKey: 'p_gqjfEcWcLc6FKunJJ6DdnEP2AI5Ra2OqQ-9klwUwwNT_3WXRYrR2tAtR3fyZHswTFpBz6diVu7cVshEI0-GRr_xOsoZXo9DyyL7qmVJ9NY5JxF3LXXxFl-5brfWnYx'

  },
  musicAPI: {
    APIKey: 'b5349bfc1def0e3eb50f189ed52ea876',
  }
}

let getMoviesByTitle = (title) => {
  let options = {
    "async": true,
    "crossDomain": true,
    url: `https://api.themoviedb.org/3/search/movie?api_key=${keys.movieAPI.v3Auth}&query=${title}`,
    headers: {
    }
  };

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (err === null) {
        console.log('MovieDB API Call Sucess!');
        resolve(body);
      } else {
        console.log('Error in MovieDB request:' + err);
        reject(err);
      }
    });
  })
}

let getSongsByTitle = (title) => {
  let options = {
    headers: {
      callback: "jsonp_callback",
    },
    url: `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${title}&api_key=${keys.musicAPI.APIKey}&format=json`,
  };

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (err === null) {
        console.log('music DB API Call Sucess!');
        resolve(body);
      } else {
        console.log('Error in music DB request:' + err);
        reject(err);
      }
    });
  });
}

let getSongDetailsById = (title) => {
  let options = {
    headers: {
      callback: "jsonp_callback",
    },
    url: `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${keys.musicAPI.APIKey}&mbid=${title}&format=json`,
  };

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (err === null) {
        console.log('music DB detail API Call Sucess!');
        resolve(body);
      } else {
        console.log('Error in music DB detail request:' + err);
        reject(err);
      }
    });
  });
}



let getFoodByName = (food, CB) => {
  const searchRequest = {
    term: food,
    location: 'austin, tx',
    url: `https://api.yelp.com/v3/businesses/search`
  };

  const client = yelp.client(keys.yelpAPI.APIKey);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses.slice(0, 5);
    const prettyJson = JSON.stringify(firstResult, null, 5);
    CB(prettyJson, null);
  }).catch(e => {
    CB(null, e);
  });

}
let getReviewById = (name, CB) => {

  const client = yelp.client(keys.yelpAPI.APIKey);

  client.reviews(name).then(response => {
    let reviews = response.jsonBody.reviews;
    CB(reviews, null)
  }).catch(err => {
    CB(null, err)
  });
}

module.exports.getMoviesByTitle = getMoviesByTitle;
module.exports.getSongsByTitle = getSongsByTitle;
module.exports.getSongDetailsById = getSongDetailsById;
module.exports.getFoodByName = getFoodByName;
module.exports.getReviewById = getReviewById;
const request = require('request');
const yelp = require('yelp-fusion');


// move keys to env file
const keys = {
  movieAPI: {
    v3Auth: 'cb6f407ec46ef9ccfe352eca08e2a993',
    v4Auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjZmNDA3ZWM0NmVmOWNjZmUzNTJlY2EwOGUyYTk5MyIsInN1YiI6IjVhZGY5Mjg3YzNhMzY4M2Q5NDAwNGE3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dLCA1wIxvT8idO3JgLpMLbIR1m5nS9MM4RrMpsl35wU'
  },
  yelpAPI: {
    clientID: 'eHPRlMklu15cUFLo2lfqpQ',
    APIKey: 'p_gqjfEcWcLc6FKunJJ6DdnEP2AI5Ra2OqQ-9klwUwwNT_3WXRYrR2tAtR3fyZHswTFpBz6diVu7cVshEI0-GRr_xOsoZXo9DyyL7qmVJ9NY5JxF3LXXxFl-5brfWnYx'

  },
  musixAPI: {
    APIKey: '27302d9695be1d0e6d5a44dc6f477905',
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
    url: `https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=getData&q_track=${title}&quorum_factor=1&apikey=${keys.musixAPI.APIKey}`,
  };

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (err === null) {
        console.log('music DB API Call Sucess!');
        resolve(eval(body));
      } else {
        console.log('Error in music DB request:' + err);
        reject(err);
      }
    });
  });
}
let getData = (body) => {
  return body.message;
}

let getFoodByName = (food, CB) => {
  const searchRequest = {
    term: food,
    location: 'austin, tx',
    url: `https://api.yelp.com/v3/businesses/search`
  };

  const client = yelp.client(keys.yelpAPI.APIKey)

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses.slice(0, 5);
    const prettyJson = JSON.stringify(firstResult, null, 5);
    CB(prettyJson, null);
  }).catch(e => {
    CB(null, e);
  });


}

module.exports.getMoviesByTitle = getMoviesByTitle;
module.exports.getSongsByTitle = getSongsByTitle;
module.exports.getFoodByName = getFoodByName;
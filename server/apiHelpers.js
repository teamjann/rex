const request = require('request');
const yelp = require('yelp-fusion');

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
    APIKey: '27302d9695be1d0e6d5a44dc6f477905'
  }
}

let getMoviesByTitle = (title, CB) => {
  let options = {
    "async": true,
    "crossDomain": true,
    url: `https://api.themoviedb.org/3/search/movie?api_key=${keys.movieAPI.v3Auth}&query=${title}`,
    headers: {
    }
  };

  request(options, function (err, res, body) {
    if (err === null) {
      CB(body);
      console.log('MovieDB API Call Sucess!');
    } else {
      console.log('Error in MovieDB request:' + err);
    }
  });
}

let getSongsByTitle = (title, CB) => {
  let options = {
    url: `http://api.musixmatch.com/ws/1.1/track.search?api_key=${keys.musixAPI.APIKey}&q_track=${title}&page_size=3&page=1&s_track_rating=desc`,
    headers: {
    }
  };

  request(options, function (err, res, body) {
    if (err === null) {
      CB(body);
      console.log('musix API Call Sucess!');
    } else {
      console.log('Error in musix request:' + err);
    }
  });
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
    const prettyJson = JSON.stringify(firstResult, null, 4);
    CB(prettyJson, null);
  }).catch(e => {
    CB(null, e);
  });


}

module.exports.getMoviesByTitle = getMoviesByTitle;
module.exports.getSongsByTitle = getSongsByTitle;
module.exports.getFoodByName = getFoodByName;
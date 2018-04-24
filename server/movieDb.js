const request = require('request');

const movieAPI = {
  v3Auth: 'cb6f407ec46ef9ccfe352eca08e2a993',
  v4Auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjZmNDA3ZWM0NmVmOWNjZmUzNTJlY2EwOGUyYTk5MyIsInN1YiI6IjVhZGY5Mjg3YzNhMzY4M2Q5NDAwNGE3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dLCA1wIxvT8idO3JgLpMLbIR1m5nS9MM4RrMpsl35wU'
}



let getMoviesByTitle = (title, CB) => {

  let options = {
    "async": true,
    "crossDomain": true,
    url: `https://api.themoviedb.org/3/search/movie?api_key=${movieAPI.v3Auth}&query=${title}`,
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

module.exports.getMoviesByTitle = getMoviesByTitle;
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/client/build'));

app.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/fare', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const url = `http://3.110.128.225:3000/fare?start=${start}&end=${end}`;
  
  request(url, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

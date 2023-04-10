const express = require('express');
const request = require('request');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/fare', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const url = `http://localhost:3000/fare?start=${start}&end=${end}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const fareRegex = /fare=(\d+)/;
    const fareMatch = data.match(fareRegex);
    if (fareMatch) {
      const fare = fareMatch[1];
      console.log(`The fare is ${fare} rupiah`);
    } else {
      console.log('Unable to retrieve fare');
    }
  })
  .catch(error => console.error(error));
 
  request(url, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); 
    }
    
    res.send(body);
   
    
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create web server
// Create a server that listens on port 3000 and responds with the comments.json file.
// The comments.json file is in the data folder. You will need to use the fs module to read the file and respond with the contents of the file.
// The server should respond with a 200 status code and the contents of the comments.json file when a GET request is made to the /comments URL.
// The server should respond with a 404 status code and an error message when a GET request is made to any other URL.
// The server should respond with a 500 status code and an error message when an error occurs while reading the comments.json file.
// To test the server, you can use curl or Postman to make a GET request to http://localhost:3000/comments.

const http = require('http');
const fs = require('fs');
const port = 3000;
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/comments') {
    fs.readFile(path.join(__dirname, 'data', 'comments.json'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'An error occurred while reading the comments file.' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
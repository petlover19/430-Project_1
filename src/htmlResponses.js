const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const cardJS = fs.readFileSync(`${__dirname}/../client/client_src/Card.js`);
const clientJS = fs.readFileSync(`${__dirname}/../client/client_src/client.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};
const getCard = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(cardJS);
  response.end();
};
const getClient = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(clientJS);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getCard,
  getClient,
};

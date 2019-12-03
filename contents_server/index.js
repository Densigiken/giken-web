const express = require('express');

const server = express();

server.get('/', (req, res) => res.send('Hello'));

server.listen(3000, () => console.log('Listening on port 3000'));
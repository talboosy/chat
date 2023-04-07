const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const socketService = require('./services/socketService');
const router = require('./routes/users');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(urlencodedParser)
app.use(bodyParser.json())

app.use('/', router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

socketService.init(server);

const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');

require('./db/mongoose');

app.use('/', apiRouter);

app.listen(port, function() {
    console.log('Listening... ' + port);
});
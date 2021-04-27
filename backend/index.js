const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db/mongoose');

//parsery - contenttype application JSON
app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRouter);

app.listen(port, function() {
    console.log('Listening... ' + port);
});
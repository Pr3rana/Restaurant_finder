const express = require('express');
const app = express();
const api = require('./routes/api')
const view = require('./routes/view')
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

app.use(bodyParser());
app.use('/', view);
app.use('/api', api);

app.use(express.static(__dirname));
app.listen(8080, () => console.log('DataViz app is listening on port '+port+"!"));
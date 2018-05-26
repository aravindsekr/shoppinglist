
const express = require('express');

const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect("mongodb://admin:admin@ds235850.mlab.com:35850/personal_app");

mongoose.connection.once('open', () => {
    console.log(' connected to database !!! ');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', (req, res) => {
  res.send('HEY!')
});

app.listen(5555, () => console.log('Server running on port 5555'));

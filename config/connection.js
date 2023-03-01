const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
});

module.exports = connection;

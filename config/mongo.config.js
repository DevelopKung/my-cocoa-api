const config = require('./config')
const mongoose = require('mongoose');
let mongo_db = 'mongodb+srv://admin:1234@cluster0.l3g0jbj.mongodb.net/test'
mongoose.set("strictQuery", false);
mongoose.connect(config.mongo_db || mongo_db, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log('MongoDB connected!!');
});

module.exports = mongoose;
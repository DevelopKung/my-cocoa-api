const config = require('./config')
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.NODE_ENV != 'development' ? config.mongo_db: process.env.MONGO_DEV , { useUnifiedTopology: true, useNewUrlParser: true });
console.log(process.env.NODE_ENV != 'development' ? config.mongo_db: process.env.MONGO_DEV);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log('MongoDB connected!!');
});

module.exports = mongoose;
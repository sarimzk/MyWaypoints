// define mongoose schema for the database

const mongoose = require('mongoose');

const weathSchema = mongoose.Schema({
  directions: Array,
  weather: Array
});

module.exports = mongoose.model('Weathr', weathSchema);

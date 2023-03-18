const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let revenues = new Schema({

  rev_id: { type: Number, index: true, unique: true, auto: true },
  rev_title: { type: String, default: null},
  rev_price: { type: Number, default: null },
  rev_note: { type: String, default: null },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "revenues" });

revenues.plugin(aggregatePaginate);
revenues.plugin(AutoIncrement, { id: 'revenues_id_counter', inc_field: 'rev_id' });

module.exports = mongoose.model("revenues", revenues);
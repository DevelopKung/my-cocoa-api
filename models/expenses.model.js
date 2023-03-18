const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let expenses = new Schema({

  exp_id: { type: Number, index: true, unique: true, auto: true },
  exp_title: { type: String, default: null},
  exp_price: { type: Number, default: null },
  exp_note: { type: String, default: null },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "expenses" });

expenses.plugin(aggregatePaginate);
expenses.plugin(AutoIncrement, { id: 'expenses_id_counter', inc_field: 'exp_id' });

module.exports = mongoose.model("expenses", expenses);
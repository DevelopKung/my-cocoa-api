const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let bills = new Schema({

  bill_id: { type: Number, index: true, unique: true, auto: true },
  prod_id: { type: String, default: null},
  topping_ids: [{ type: Number }],
  description: { type: String, default: null },
  total: { type: Number, default: null },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "bills" });

bills.plugin(aggregatePaginate);
bills.plugin(AutoIncrement, { id: 'bill_id_counter', inc_field: 'bill_id' });

module.exports = mongoose.model("bills", bills);
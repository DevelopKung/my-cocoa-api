const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let toppings = new Schema({

  topping_id: { type: Number, index: true, unique: true, auto: true },
  topping_name: { type: String, default: null },
  description: { type: String, default: null },
  price: { type: Number, default: null },
  status: { type: Boolean, default: true },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "toppings" });

toppings.plugin(aggregatePaginate);
toppings.plugin(AutoIncrement, { id: 'toppings_id_counter', inc_field: 'topping_id' });

module.exports = mongoose.model("toppings", toppings);
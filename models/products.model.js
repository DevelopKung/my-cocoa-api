const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let products = new Schema({

  prod_id: { type: Number, index: true, unique: true, auto: true },
  prod_name: { type: String, default: null },
  prod_type: { type: String, default: null },
  description: { type: String, default: null },
  price: { type: Number, default: null },
  status: { type: Boolean, default: true },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "products" });

products.plugin(aggregatePaginate);
products.plugin(AutoIncrement, { id: 'prod_id_counter', inc_field: 'prod_id' });

module.exports = mongoose.model("products", products);
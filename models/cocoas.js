const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let cocoas = new Schema({

  cocoa_id: { type: Number, index: true, unique: true, auto: true },
  pet_id: { type: Number },
  title: { type: String, default: null },
  date: { type: Date, default: null },
  description: { type: String, default: null },
  examination_site: { type: String, default: null },
  status: { type: Boolean, default: true },

  created_by: { type: String, default: null },
  updated_by: { type: String, default: null },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "cocoas" });

cocoas.plugin(aggregatePaginate);
cocoas.plugin(AutoIncrement, { id: 'cocoas_id_counter', inc_field: 'cocoa_id' });

module.exports = mongoose.model("cocoas", cocoas);
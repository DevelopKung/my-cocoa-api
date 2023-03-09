const db = {};

db.bills = require("./bill.model.js")
db.items = require("./products.model.js")
db.toppings = require("./topping.model.js")

module.exports = db;
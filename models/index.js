const db = {};

db.bills = require("./bill.model.js")
db.products = require("./products.model.js")
db.toppings = require("./topping.model.js")

db.expenses = require("./expenses.model.js")
db.revenue = require("./revenue.model.js")
module.exports = db;
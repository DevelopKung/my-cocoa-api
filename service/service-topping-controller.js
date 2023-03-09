const fs = require('fs')
const db = require("../models");
const toppings = db.toppings
const fc = require("./service");

let self = module.exports = {
  QueryAll: async(params) => {
    try {
      let res = await toppings.find()
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }

  },

  QueryOne: async(topping_id) => {
    try {
      let res = await toppings.findOne({ topping_id })
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Create: async(params) => {
    try {
      let top = await toppings.findOne({ topping_name: params.topping_name })
      if (top) {
        let data = await fc.responseData(null, false, 'ท็อปปิ้งนี้มีแล้ว')
        return data
      }
      await toppings(params).save(params)
      let data = await fc.responseData(null, true, 'สร้างสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Update: async(topping_id, params) => {
    try {
      let res = await toppings.findOneAndUpdate({ topping_id }, params)
      if ([res].length == 1 && res) {
        let data = await fc.responseData(null, true, 'อัพเดทสำเร็จ')
        return data
      } else {
        let data = await fc.responseData(null, true, `id ${topping_id} อัพเดทไม่สำเร็จ`)
        return data
      }
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Delete: async(topping_id) => {
    try {
      let res = await toppings.deleteOne({ topping_id })
      let data = await fc.responseData(null, true, 'ลบสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },
}
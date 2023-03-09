const fs = require('fs')
const db = require("../models");
const items = db.items
const fc = require("./service");

let self = module.exports = {
  QueryAll: async(params) => {
    try {
      let res = await items.find()
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }

  },

  QueryOne: async(bill_id) => {
    try {
      let res = await items.findOne({ bill_id })
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Create: async(params) => {
    try {
      await items(params).save(params)
      let data = await fc.responseData(null, true, 'สร้างสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Update: async(bill_id, params) => {
    try {
      let res = await items.findOneAndUpdate({ bill_id }, params)
      if ([res].length == 1 && res) {
        let data = await fc.responseData(null, true, 'อัพเดทสำเร็จ')
        return data
      } else {
        let data = await fc.responseData(null, true, `id ${bill_id} อัพเดทไม่สำเร็จ`)
        return data
      }
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Delete: async(bill_id) => {
    try {
      let res = await items.deleteOne({ bill_id })
      let data = await fc.responseData(null, true, 'ลบสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },
}
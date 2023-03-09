const fs = require('fs')
const db = require("../models");
const products = db.products
const fc = require("./service");

let self = module.exports = {
  QueryAll: async(params) => {
    try {
      let res = await products.find()
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }

  },

  QueryOne: async(prod_id) => {
    try {
      let res = await products.findOne({ prod_id })
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Create: async(params) => {
    try {
      await products(params).save(params)
      let data = await fc.responseData(null, true, 'สร้างสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Update: async(prod_id, params) => {
    try {
      let res = await products.findOneAndUpdate({ prod_id }, params)
      if ([res].length == 1 && res) {
        let data = await fc.responseData(null, true, 'อัพเดทสำเร็จ')
        return data
      } else {
        let data = await fc.responseData(null, true, `id ${prod_id} อัพเดทไม่สำเร็จ`)
        return data
      }
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Delete: async(prod_id) => {
    try {
      await products.deleteOne({ prod_id })
      let data = await fc.responseData(null, true, 'ลบสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },
}
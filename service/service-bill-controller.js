const fs = require('fs')
const db = require("../models");
const bills = db.bills
const fc = require("./service");

let self = module.exports = {
  QueryAll: async(params) => {
    try {
      let res = await bills.find()
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }

  },

  QueryOne: async(bill_id) => {
    try {
      let res = await bills.findOne({ bill_id })
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Create: async(params) => {
    try {
      for (let i = 0; i < params.length; i++) {
        let form = params[i];
        form.updated_date = ''
        await bills(form).save(form)
      }
      let data = await fc.responseData(null, true, 'สร้างสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Update: async(bill_id, params) => {
    try {
      let res = await bills.findOneAndUpdate({ bill_id }, params)
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
      let res = await bills.deleteOne({ bill_id })
      let data = await fc.responseData(null, true, 'ลบสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },
}
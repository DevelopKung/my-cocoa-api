const fs = require('fs')
const db = require("../models");
const bills = db.bills
const fc = require("./service");
const moment = require('moment')

let self = module.exports = {
  QueryAll: async(params) => {
    try {
      let res = await bills.find({
        created_date: {
          $gte: new Date(params.start),
          $lte: new Date(params.end)
        }
      })
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }

  },

  QueryAllOption: async(params) => {
    try {

      let day = await bills.find({ created_date: { $gte: new Date(moment()).setHours(0, 0, 0, 0) } })
      day = { qty: day.length, total: day.reduce((a, b) => a + b.total, 0) }

      let week = await bills.find({
        created_date: {
          $gte: new Date(moment().add(-7, 'days')).setHours(0, 0, 0, 0),
          $lte: new Date(moment()).setHours(0, 0, 0, 0)
        }
      })
      week = { qty: week.length, total: week.reduce((a, b) => a + b.total, 0) }

      let month = await bills.find({
        created_date: {
          $gte: new Date(moment().startOf('month')).setHours(0, 0, 0, 0),
          $lte: new Date(moment().endOf('month')).setHours(0, 0, 0, 0)
        }
      })
      month = { qty: month.length, total: month.reduce((a, b) => a + b.total, 0) }
      
      let dt = { day, week, month }
      let data = await fc.responseData(dt, true, 'success')
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
const fs = require('fs')
const db = require("../models");
const revenue = db.revenue
const fc = require("./service");
const moment = require('moment')

function setHoursTodate(date, time) {
  if (time == 0) {
    return new Date(date).setHours(0, 0, 0, 0)
  } else {
    return new Date(date).setHours(23, 59, 59, 0)
  }
}

let self = module.exports = {

  Calculate: async (params) => {
    try {
      let search = await revenue.find({
        created_date: {
          $gte: new Date(params.start.setHours(0, 0, 0, 0)),
          $lte: new Date(params.end.setHours(23, 59, 59, 0))
        }
      })
      let cal = { qty: search.length, total: search.reduce((a, b) => a + b.rev_price, 0) }

      let day = await revenue.find({
        created_date: {
          $gte: new Date(setHoursTodate(new Date(), 0)),
          $lte: new Date(setHoursTodate(new Date(), 23))
        }
      })
      day = { qty: day.length, total: day.reduce((a, b) => a + b.rev_price, 0) }

      let week = await revenue.find({
        created_date: {
          $gte: new Date( setHoursTodate(moment().add(-7, 'days'), 0) ),
          $lte: new Date( setHoursTodate(new Date(), 23))
        }
      })
      week = { qty: week.length, total: week.reduce((a, b) => a + b.rev_price, 0) }

      let month = await revenue.find({
        created_date: {
          $gte: new Date(setHoursTodate(moment().startOf('month'), 0)),
          $lte: new Date(setHoursTodate(moment().endOf('month'), 23))
        }
      })
      month = { qty: month.length, total: month.reduce((a, b) => a + b.rev_price, 0) }

      let dt = { day, week, month, search: cal }
      let data = await fc.responseData(dt, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }

  },

  QueryAll: async(params) => {
    try {
      let res = await revenue.find({
        created_date: {
          $gte: new Date(setHoursTodate(params.start, 0)),
          $lte: new Date(setHoursTodate(params.end, 23))
        }
      }).sort({ created_date: 1 })
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }

  },

  QueryOne: async(rev_id) => {
    try {
      let res = await revenue.findOne({ rev_id })
      let data = await fc.responseData(res, true, 'success')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Create: async(params) => {
    try {
      await revenue(params).save(params)
      let data = await fc.responseData(null, true, 'สร้างสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Update: async(rev_id, params) => {
    try {
      let res = await revenue.findOneAndUpdate({ rev_id }, params)
      if ([res].length == 1 && res) {
        let data = await fc.responseData(null, true, 'อัพเดทสำเร็จ')
        return data
      } else {
        let data = await fc.responseData(null, true, `id ${rev_id} อัพเดทไม่สำเร็จ`)
        return data
      }
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },

  Delete: async(rev_id) => {
    try {
      await revenue.deleteOne({ rev_id })
      let data = await fc.responseData(null, true, 'ลบสำเร็จ')
      return data
    } catch (error) {
      let data = await fc.responseData(null, false, error.message)
      return data
    }
  },
}
const serviceDB = require("../service/service-expenses");

module.exports = {

  findAll: async(req, res) => {
    try {
      let start = new Date(req.query.start)
      let end = new Date(req.query.end)
      if (start > end) {
        let s = end; let e = start
        start = s; end = e
      }
      let params = { start, end }
      let result = await serviceDB.QueryAll(params)
      if (result.status === true) {
        res.status(200).send(result);
      } else {
        res.status(403).send(result);
      }
    } catch (error) {
      res.status(500).send({ status: false, message: "EROR 500 SERVER !", error: error.message });
    }
  },

  findOne: async(req, res) => {
    try {
      let result = await serviceDB.QueryOne(req.params.id)
      if (result.status === true) {
        res.status(200).send(result);
      } else {
        res.status(500).send(result);
      }
    } catch (error) {
      res.status(500).send({ status: false, message: "EROR 500 SERVER !", error: error.message });
    }
  },

  create: async(req, res) => {
    try {
      let form = req.body
      if (form.exp_title && form.exp_price) {
        form.updated_date = ''
        let result = await serviceDB.Create(form)
        if (result.status === true) {
          res.status(200).send(result);
        } else {
          res.status(500).send(result);
        }
      } else {
        res.status(500).send({ status: false, message: "EROR 500 SERVER !", error: error.message });
      }
    } catch (error) {
      res.status(500).send({ status: false, message: "EROR 500 SERVER !", error: error.message });
    }
  },

  update: async(req, res) => {
    try {
      const id = req.params.id;
      let form = req.body
      form.updated_date = new Date()
      let result = await serviceDB.Update(id, form)
      if (result.status === true) {
        res.status(200).send(result);
      } else {
        res.status(500).send(result);
      }
    } catch (err) {
      res.status(500).send({ status: false, message: "ERROR SERVER!", error: err.message });
    }
  },

  delete: async(req, res) => {
    try {
      const id = req.params.id;
      let result = await serviceDB.Delete(id)
      if (result.status === true) {
        res.status(200).send(result);
      } else {
        res.status(500).send(result);
      }
    } catch (err) {
      res.status(500).send({ status: false, message: "ERROR SERVER!", error: err.message });
    }
  },

  Calculate: async(req, res) => {
    try {
      let start = new Date(req.query.start)
      let end = new Date(req.query.end)
      if (start > end) {
        let s = end; let e = start
        start = s; end = e
      }
      let params = { start, end }
      let result = await serviceDB.Calculate(params)
      if (result.status === true) {
        res.status(200).send(result);
      } else {
        res.status(500).send(result);
      }
    } catch (err) {
      res.status(500).send({ status: false, message: "ERROR SERVER!", error: err.message });
    }
  },

}
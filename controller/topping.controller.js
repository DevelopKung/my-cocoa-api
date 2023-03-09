const serviceDB = require("../service/service-topping-controller");

module.exports = {

  findAll: async(req, res) => {
    try {
      let result = await serviceDB.QueryAll(req.body)
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
      form.updated_date = ''
      let result = await serviceDB.Create(form)
      if (result.status === true) {
        res.status(200).send(result);
      } else {
        res.status(500).send(result);
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

}
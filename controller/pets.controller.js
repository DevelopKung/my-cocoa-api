const db = require("../models");
const pets = db.pets
const member = db.member
const serviceDB = require("../service/service-controller");
const uploadProfile = require("../service/upload-profile");

module.exports = {

  findAll: async(req, res) => {
    try {
      let result = await serviceDB.QueryPets(req.params)
      res.status(200).send({ status: true, message: "success", payload: result });
    } catch (err) {
      res.status(500).send({ status: false, message: "ERROR SERVER!", error: err.message });
    }
  },

  findOne: async(req, res) => {
    try {
      let result = await serviceDB.QueryPets(req.params)
      if (result.docs && result.docs.length > 0) {
        result.docs = result.docs[0]
        res.status(200).send({ status: true, message: "success", payload: result });
      } else {
        res.status(200).send({ status: true, message: "success", payload: result });
      }

    } catch (err) {
      res.status(500).send({ status: false, message: "ERROR SERVER!", error: err.message });
    }
  },

  create: async(req, res) => {
    let file = req.file
    let form = req.body
    form.updated_by = ''
    form.updated_date = ''
    let mem = await member.findOne({ _id: form.created_by })
    if (mem) {
      form.member_id = mem.member_id
      form.username = mem.username
    }
    let form_pets = await uploadProfile(file, req.body, 'pet')
    new pets(form_pets).save(form_pets).then(async data => {
      if (data.pet_id) {
        res.status(200).send({ status: true, message: "success" });
      }
    }).catch(err => {
      res.status(500).send({ status: false, message: "ERROR SERVER!", error: err.message });
    });
  },

  update: async(req, res) => {
    try {
      let form = req.body
      form.updated_date = new Date()
      let result = await serviceDB.updatePets(req.file, req.body)
      let pet_id = result.pet_id
      let num = await pets.findOneAndUpdate({ pet_id }, result)
      if ([num].length == 1 && num) {
        res.status(200).send({ status: true, message: "Data was updated successfully" });
      } else {
        res.status(403).send({
          status: false,
          message: `Cannot update with id=${ pet_id }. Maybe was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({ status: false, message: "ERROR SERVER!", error: err.message });
    }
  },

}
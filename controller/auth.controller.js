const db = require("../models");

const config = require("./../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  login: async(req, res) => {
    let time = "24h";
    const username = req.body.username;
    const password = req.body.password;
    try {
      if (username && password) {
        if (username == 'E-fat' && password == '123456') {
          let user = {
            username,
            firstname: 'Admin',
            lastname: 'Use'
          }
          let token = jwt.sign({ user }, config.jwt_secret, { expiresIn: time });
          let data = { token, expiresIn: time };
          res.status(200).send({ status: true, message: "success", payload: data });
          return
        }
      }
      res.status(403).send({ status: false, message: "รหัสผ่านไม่ถูกต้อง!" });
    } catch (error) {
      console.log(error.message);
      res.status(403).send({ status: false, message: "รหัสผ่านไม่ถูกต้อง!" });
    }
  },

  user: async(req, res) => {
    try {
      let token = req.headers.authorization.replace("Bearer ", "");
      if (token) {
        const decoded = jwt.verify(token, config.jwt_secret);
        if (decoded) {
          res.status(200).send({
            status: true,
            message: "success",
            payload: decoded,
          });
        } else {
          res.status(403).send({
            status: false,
            message: "ไม่พบโทเค็น",
          });
        }
      } else {
        res.status(403).send({
          status: false,
          message: "ไม่พบโทเค็น",
        });
      }
    } catch (error) {
      res.status(403).send({
        status: false,
        message: "username password ไม่ถูกต้อง",
      });
    }
  }
};
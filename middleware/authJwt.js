const jwt = require("jsonwebtoken");
const config = require("../../starter-express-api/config/config");

verifyToken = async(req, res, next) => {
  let token = await req.headers["authorization"]

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  token = token.split(' ')[1];
  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.memberId = decoded.member_id;
    req.username = decoded.username;
    next();
  });
};

module.exports = { verifyToken };
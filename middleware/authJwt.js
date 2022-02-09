const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");

const User = db.User;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).send({ message: "No hay token" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ mesagge: "No autorizado" });
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;

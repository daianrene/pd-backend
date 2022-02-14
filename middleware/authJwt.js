const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");

const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).send({ message: "No hay token" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ mesagge: "No autorizado" });
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.rol === "admin") {
      next();
      return;
    }
    res.status(403).send({ message: "No es admin" });
    return;
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;

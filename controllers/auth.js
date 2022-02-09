const db = require("../models");
const config = require("../config/auth");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const User = db.user;
const Role = db.role;

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) =>
      user.setRoles([1]).then(() => res.send({ message: "Usuario registrado" }))
    )
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.sigin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user)
        return res.status(404).send({ message: "Usuario no encontrado" });
      if (user.password != req.body.password)
        return res
          .status(401)
          .send({ accesToken: null, message: "Contraseña incorrecta" });

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: ["user"],
        accessToken: token,
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

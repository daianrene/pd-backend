const db = require("../models");
const config = require("../config/auth");
const jwt = require("jsonwebtoken");

const User = db.user;

const signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol,
  })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const sigin = (req, res) => {
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
        expiresIn: 7200,
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol,
        accessToken: token,
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  signup,
  sigin,
};

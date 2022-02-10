const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkUser = (req, res, next) => {
  //Usuario
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Nombre de usuario ocupado" });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Email ocupado",
        });
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkUser,
};

module.exports = verifySignUp;

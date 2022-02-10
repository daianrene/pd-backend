const db = require("../models");

const User = db.user;

exports.allUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.send(usuarios);
  } catch (err) {
    res.status(500).send({ message: "test" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const prom = await User.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.send({ message: "Se borro correctamente" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const prom = await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.send({ message: prom });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

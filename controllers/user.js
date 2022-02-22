const db = require("../models");

const User = db.user;
const Message = db.message;

exports.allUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.send(usuarios);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
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

exports.sendMessage = async (req, res) => {
  try {
    const prom = await Message.create({
      message: req.body.message,
      read: false,
      userId: req.body.toUserId,
    });
    res.send({ message: prom });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const mensajes = await Message.findAll({
      where: { userId: req.query.userId },
      order: [["id", "DESC"]],
    });
    res.send(mensajes);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

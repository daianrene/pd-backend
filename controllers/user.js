const db = require("../models");

const User = db.user;
const Message = db.message;
const Reporte = db.reporte;

const allUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.send(usuarios);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

const deleteUser = async (req, res) => {
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

const updateUser = async (req, res) => {
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

const sendMessage = async (req, res) => {
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

const getMessages = async (req, res) => {
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

const postReporte = async (req, res) => {
  try {
    const reporte = await Reporte.findOne({
      where: { turno: req.body.turno, fecha: req.body.fecha },
    });
    if (reporte !== null) {
      const updtReporte = await Reporte.update(
        { ...req.body, userId: req.body.user },
        {
          where: {
            id: reporte.dataValues.id,
          },
        }
      );
      res.send();
    } else {
      const newReporte = await Reporte.create({
        turno: req.body.turno,
        fecha: req.body.fecha,
        detalle: req.body.detalle,
        userId: req.body.user,
      });
      res.send();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getReportes = async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      attributes: ["turno", "fecha", "detalle", "userId"],
      where: { userId: req.query.userId },
    });
    res.send(reportes);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

const getAllReportes = async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      attributes: ["turno", "fecha", "detalle", "userId"],
    });
    console.log(reportes);
    res.send(reportes);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

module.exports = {
  allUsers,
  deleteUser,
  getMessages,
  updateUser,
  getMessages,
  sendMessage,
  postReporte,
  getReportes,
  getAllReportes,
};

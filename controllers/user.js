const db = require("../models");

const User = db.user;
const Message = db.message;
const Reporte = db.reporte;

const getMessages = async (req, res) => {
  try {
    const mensajes = await Message.findAll({
      where: { userId: req.userId },
      order: [["id", "DESC"]],
    });
    res.send(mensajes);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

const postReporte = async (req, res) => {
  console.log(req.body);
  try {
    const reporte = await Reporte.findOne({
      where: {
        turno: req.body.turno,
        fecha: req.body.fecha,
        userId: req.body.user,
      },
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
    let reportes = await Reporte.findAll({
      include: [
        {
          model: User,
          required: true,
          attributes: ["username"],
        },
      ],
      attributes: ["turno", "fecha", "detalle", "userId"],
      order: [
        ["fecha", "DESC"],
        ["turno", "DESC"],
        ["updatedAt", "DESC"],
      ],
    });
    res.send(reportes);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

const readMessage = async (req, res) => {
  try {
    const prom = await Message.update(
      { read: 1 },
      { where: { id: req.body.idMessage } }
    );
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

module.exports = {
  getMessages,
  postReporte,
  getReportes,
  readMessage,
};

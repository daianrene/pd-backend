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

const allConserjes = async (req, res) => {
  try {
    const conserjes = await User.findAll({
      attributes: ["id", "username"],
    });
    res.send(conserjes);
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

const getAllMessages = async (req, res) => {
  try {
    const mensajes = await Message.findAll({
      include: [
        {
          model: User,
          required: true,
          attributes: ["username"],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.send(mensajes);
  } catch (err) {
    res.status(500).send({ message: "Error en la base de datos" });
  }
};

// const getAllReportes = async (req, res) => {
//   try {
//     const reportes = await Reporte.findAll({
//       include: [
//         {
//           model: User,
//           required: true,
//           attributes: ["username"],
//         },
//       ],
//       attributes: ["turno", "fecha", "detalle", "userId"],
//       order: [
//         ["fecha", "DESC"],
//         ["turno", "DESC"],
//       ],
//     });
//     console.log(reportes);
//     res.send(reportes);
//   } catch (err) {
//     res.status(500).send({ message: "Error en la base de datos" });
//   }
// };

module.exports = {
  allUsers,
  allConserjes,
  sendMessage,
  deleteUser,
  updateUser,
  getAllMessages,
  // getAllReportes,
};

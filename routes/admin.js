const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/admin");
const router = require("express").Router();

module.exports = (app) => {
  router.get(
    "/admin/allmessages",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllMessages
  );

  router.get(
    "/admin/usuarios",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allUsers
  );

  router.get(
    "/admin/conserjes",
    [authJwt.verifyToken],
    controller.allConserjes
  );

  router.delete(
    "/admin/usuarios/delete",
    [authJwt.verifyToken, authJwt.isAdmin],

    controller.deleteUser
  );

  router.put(
    "/admin/usuarios/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );

  router.post(
    "/admin/usuarios/message",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.sendMessage
  );

  // router.get(
  //   "/admin/allreportes",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.getAllReportes
  // );

  app.use("/api", router);
};

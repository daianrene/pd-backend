const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/user");
const router = require("express").Router();

module.exports = (app) => {
  // app.use((req, res, next) => {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  router.get(
    "/admin/usuarios",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allUsers
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

  router.get(
    "/usuarios/messages",
    [authJwt.verifyToken],
    controller.getMessages
  );

  router.put(
    "/usuarios/addreporte",
    [authJwt.verifyToken],
    controller.postReporte
  );

  router.get(
    "/usuarios/reportes",
    [authJwt.verifyToken],
    controller.getReportes
  );

  router.get(
    "/usuarios/allreportes",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllReportes
  );

  app.use("/api", router);
};

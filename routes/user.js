const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/user");
const router = require("express").Router();

module.exports = (app) => {
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

  router.put(
    "/usuarios/readMessage",
    [authJwt.verifyToken],
    controller.readMessage
  );

  app.use("/api", router);
};

const { authJwt } = require("../middleware");
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
    "/usuarios",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.allUsers
  );

  router.delete(
    "/usuarios/delete",
    //[authJwt.verifyToken, authJwt.isAdmin],

    controller.deleteUser
  );

  router.put(
    "/usuarios/update",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );

  app.use("/api/admin", router);
};

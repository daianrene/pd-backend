const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const router = require("express").Router();

module.exports = (app) => {
  router.post(
    "/signup",
    [verifySignUp.checkUser, verifyToken, isAdmin],
    controller.signup
  );

  router.post("/signin", controller.sigin);

  router.post("/validate", verifyToken, (req, res) => {
    res.send({ message: "token valido" });
  });

  app.use("/api/auth", router);
};

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/signup", verifySignUp.checkUser, controller.signup);

  router.post("/signin", controller.sigin);

  app.use("/api/auth", router);
};

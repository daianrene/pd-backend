const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkUser, verifySignUp.checkRoles],
    controller.signup
  );

  app.post("/api/auth/signin", controller.sigin);
};

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }

// const Role = db.role;
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Hola" });
});

// rutas
require("./routes/auth")(app);
require("./routes/user")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

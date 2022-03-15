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

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Hola" });
});

// rutas
require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/admin")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

const config = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  logging: false,
  dialectOptions: {
    // useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: function (field, next) {
      // for reading from database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },

  timezone: "-03:00", // for writing to database
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.message = require("./message.js")(sequelize, Sequelize);
db.reporte = require("./reporte.js")(sequelize, Sequelize);

db.user.hasMany(db.message, {
  foreignKey: "userId",
});

db.user.hasMany(db.reporte, {
  foreignKey: "userId",
});

db.message.belongsTo(db.user, {
  foreignKey: "userId",
});

db.reporte.belongsTo(db.user, {
  foreignKey: "userId",
});

db.ROLES = ["user", "admin"];

module.exports = db;

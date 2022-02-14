module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    // username: {
    //   type: Sequelize.STRING,
    // },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    rol: Sequelize.STRING,
  });
  return User;
};

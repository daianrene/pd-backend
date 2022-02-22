module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    message: Sequelize.STRING,
    read: Sequelize.BOOLEAN,
  });
  return Message;
};

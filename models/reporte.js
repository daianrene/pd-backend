module.exports = (sequelize, Sequelize) => {
  const Reporte = sequelize.define("reportes", {
    turno: Sequelize.STRING,
    fecha: Sequelize.DATEONLY,
    detalle: Sequelize.STRING,
  });
  return Reporte;
};

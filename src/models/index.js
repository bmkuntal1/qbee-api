const config = require("../config/config");
const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
//   host: config.db.host,
//   dialect: config.db.dialect,
//   ssl: true,
// });

const sequelize = new Sequelize("postgres://default:jDTvg37wHQLf@ep-rough-unit-a123cylq.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require", {
  dialect: "postgres", ssl: true,
  define: {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },

});

// connection status check
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

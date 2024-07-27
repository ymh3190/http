import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "mysql",

  pool: {
    max: 5,
  },
});

export default sequelize;

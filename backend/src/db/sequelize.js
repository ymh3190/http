import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'mysql',

  pool: {
    max: 10,
  },
});

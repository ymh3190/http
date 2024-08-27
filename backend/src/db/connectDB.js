import { sequelize } from './sequelize';

export const connectDB = async () => {
  await sequelize.authenticate({ logging: false });
  await sequelize.sync({ logging: false, alter: true });
  console.log('Connected to DB');
};

import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Image = sequelize.define(
  'Image',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'image' },
);

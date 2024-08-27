import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Video = sequelize.define(
  'Video',
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
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'video' },
);

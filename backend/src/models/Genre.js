import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Genre = sequelize.define(
  'Genre',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'uniqueGenre',
    },
    videoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: sequelize.models.Video,
        key: 'id',
      },
      unique: 'uniqueGenre',
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: sequelize.models.Image,
        key: 'id',
      },
      unique: 'uniqueGenre',
    },
  },
  {
    tableName: 'genre',
  },
);

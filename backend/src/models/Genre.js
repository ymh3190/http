import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

export const Genre = sequelize.define(
  'Genre',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.Video,
        key: 'id',
      },
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.Image,
        key: 'id',
      },
    },
  },
  {
    tableName: 'genre',
    indexes: [
      {
        unique: true,
        fields: ['name', 'videoId'],
      },
      {
        unique: true,
        fields: ['name', 'imageId'],
      },
    ],
  },
);

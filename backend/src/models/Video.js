import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize";

export const Video = sequelize.define(
  "Video",
  {
    file: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "video" }
);

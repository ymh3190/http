import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize";

export const Image = sequelize.define(
  "Image",
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
  { tableName: "image" }
);

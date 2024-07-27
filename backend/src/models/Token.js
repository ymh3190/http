import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize";

export const Token = sequelize.define(
  "Token",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.User,
        key: "id",
      },
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "token" }
);

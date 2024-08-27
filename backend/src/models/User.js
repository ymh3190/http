import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import * as argon from 'argon2';

export const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    tableName: 'user',
  },
);

User.addHook('beforeCreate', async (user) => {
  user.password = await argon.hash(user.password);
});

User.prototype.comparePassword = async function (plainPassword) {
  const isMatch = await argon.verify(this.password, plainPassword);
  return isMatch;
};

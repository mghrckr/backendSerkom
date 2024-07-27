'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ListPeserta, { foreignKey: "UserId" })
    }
  }
  User.init({
    nama_lengkap: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "email must be required"
        },
        notNull: {
          msg: "email must be required"
        },
        isEmail: true
      }
    },
    nomor_hp: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password must be required"
        },
        notNull: {
          msg: "password must be required"
        },
        len: {
          args: [5],
          msg: "password minimum 5 characters"
        }
      }
    },
    tanggal_lahir: DataTypes.DATE,
    jenis_kelamin: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    let hashing = hashPassword(user.password)
    user.password = hashing
  })
  return User;
};
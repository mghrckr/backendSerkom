'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListPeserta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListPeserta.belongsTo(models.User, { foreignKey: "UserId" })
      ListPeserta.belongsTo(models.TrainingEvent, { foreignKey: "TrainingEventId" });
    }
  }
  ListPeserta.init({
    UserId: DataTypes.INTEGER,
    TrainingEventId: DataTypes.INTEGER,
    Jenjang: DataTypes.STRING,
    Bidang: DataTypes.STRING,
    SubBidang: DataTypes.STRING,
    form_pp: DataTypes.STRING,
    Ktp: DataTypes.STRING,
    Ijazah: DataTypes.STRING,
    pas_foto: DataTypes.STRING,
    sk: DataTypes.STRING,
    foto_kegiatan: DataTypes.STRING,
    batch: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListPeserta',
  });
  return ListPeserta;
};
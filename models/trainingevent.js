'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrainingEvent.hasMany(models.ListPeserta, { foreignKey: "TrainingEventId",  onDelete: 'CASCADE'  })
    }
  }
  TrainingEvent.init({
    link_gambar: DataTypes.STRING,
    judul: DataTypes.STRING,
    tanggal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TrainingEvent',
  });
  return TrainingEvent;
};
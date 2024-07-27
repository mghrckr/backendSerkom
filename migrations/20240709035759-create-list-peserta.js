'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListPeserta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      Jenjang: {
        type: Sequelize.STRING
      },
      Bidang: {
        type: Sequelize.STRING
      },
      SubBidang: {
        type: Sequelize.STRING
      },
      form_pp: {
        type: Sequelize.STRING
      },
      Ktp: {
        type: Sequelize.STRING
      },
      Ijazah: {
        type: Sequelize.STRING
      },
      pas_foto: {
        type: Sequelize.STRING
      },
      sk: {
        type: Sequelize.STRING
      },
      foto_kegiatan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ListPeserta');
  }
};
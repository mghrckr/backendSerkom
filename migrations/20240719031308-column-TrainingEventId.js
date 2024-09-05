'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('ListPeserta', 'TrainingEventId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'TrainingEvents'
        },
        key: 'id'
      },
      onDelete: 'CASCADE',  // Menambahkan opsi onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('ListPeserta', 'TrainingEventId');
  }
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Videos", "resolution_x", {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "Độ phân giải video (ví dụ: 1080p, 720p)",
    });

    await queryInterface.addColumn("Videos", "resolution_y", {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "Độ phân giải video (ví dụ: 1080p, 720p)",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Videos", "resolution_x");
    await queryInterface.removeColumn("Videos", "resolution_y");
  },
};

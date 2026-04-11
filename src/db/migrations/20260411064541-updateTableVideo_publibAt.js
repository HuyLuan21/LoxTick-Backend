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
    await queryInterface.addColumn("Videos", "published_at", {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "Thời gian video được công khai",
    });

    await queryInterface.addColumn("Videos", "allow_repost", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      comment: "Cho phép video được repost",
    });

    await queryInterface.addColumn("Videos", "allow_comment", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      comment: "Cho phép video được comment",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Videos", "published_at");
    await queryInterface.removeColumn("Videos", "allow_repost");
    await queryInterface.removeColumn("Videos", "allow_comment");
  },
};

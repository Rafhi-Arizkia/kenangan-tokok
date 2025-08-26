import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Add timestamp columns to `order` table to match the model
  await queryInterface.addColumn('order', 'createdAt', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });

  await queryInterface.addColumn('order', 'updatedAt', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  });

  await queryInterface.addColumn('order', 'deletedAt', {
    type: DataTypes.DATE,
    allowNull: true,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('order', 'deletedAt');
  await queryInterface.removeColumn('order', 'updatedAt');
  await queryInterface.removeColumn('order', 'createdAt');
}

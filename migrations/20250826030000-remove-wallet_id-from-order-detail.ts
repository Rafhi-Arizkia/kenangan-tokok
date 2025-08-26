import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Remove wallet_id column from order_detail if exists
  await queryInterface.removeColumn('order_detail', 'wallet_id');
}

export async function down(queryInterface: QueryInterface) {
  // Re-add wallet_id column (reversible)
  await queryInterface.addColumn('order_detail', 'wallet_id', {
    type: DataTypes.BIGINT,
    allowNull: false,
  });
}

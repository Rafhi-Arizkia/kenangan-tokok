import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Remove unused cartItem_id column from order_detail
  // Use try/catch to avoid failure if column already missing
  try {
    await queryInterface.removeColumn('order_detail', 'cartItem_id');
  } catch (err) {
    // ignore if already removed
    // console.warn('cartItem_id column not present or already removed', err);
  }
}

export async function down(queryInterface: QueryInterface) {
  // Recreate the column to make this migration reversible
  await queryInterface.addColumn('order_detail', 'cartItem_id', {
    type: DataTypes.STRING,
    allowNull: false,
  });
}

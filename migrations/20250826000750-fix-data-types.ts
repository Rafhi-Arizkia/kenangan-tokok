import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Fix data type mismatches before adding foreign key constraints
  
  // Change shop_id in shop_categories from INTEGER to BIGINT to match shop.id
  await queryInterface.changeColumn('shop_categories', 'shop_id', {
    type: DataTypes.BIGINT,
    allowNull: false,
  });
}

export async function down(queryInterface: QueryInterface) {
  // Revert shop_id back to INTEGER
  await queryInterface.changeColumn('shop_categories', 'shop_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
  });
}

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('gift__specifications', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    gift_id: { type: DataTypes.BIGINT, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    value: { type: DataTypes.TEXT, allowNull: false },
    unit: { type: DataTypes.STRING(50), allowNull: true },
    sort_order: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await queryInterface.createTable('gift__variants', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    gift_id: { type: DataTypes.BIGINT, allowNull: true },
    variant_name: { type: DataTypes.STRING(255), allowNull: false },
    variant_value: { type: DataTypes.STRING(255), allowNull: false },
    price_adjustment: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
    stock: { type: DataTypes.INTEGER, allowNull: true },
    sku: { type: DataTypes.STRING(100), allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('gift__variants');
  await queryInterface.dropTable('gift__specifications');
}

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('gift', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    shop_id: { type: DataTypes.BIGINT, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(15,2), allowNull: false },
    discount_price: { type: DataTypes.DECIMAL(15,2), allowNull: true },
    weight: { type: DataTypes.INTEGER, allowNull: true },
    stock: { type: DataTypes.INTEGER, allowNull: true },
    min_order: { type: DataTypes.INTEGER, defaultValue: 1 },
    max_order: { type: DataTypes.INTEGER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    sku: { type: DataTypes.STRING(100), allowNull: true },
    tags: { type: DataTypes.TEXT, allowNull: true },
    meta_title: { type: DataTypes.STRING(255), allowNull: true },
    meta_description: { type: DataTypes.TEXT, allowNull: true },
    rating: { type: DataTypes.DECIMAL(3,2), allowNull: true },
    total_reviews: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_sold: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('gift');
}

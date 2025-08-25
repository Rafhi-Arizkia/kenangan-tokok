import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('gift__reviews', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    gift_id: { type: DataTypes.BIGINT, allowNull: false },
    order_item_id: { type: DataTypes.BIGINT, allowNull: true },
    user_id: { type: DataTypes.BIGINT, allowNull: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    review_text: { type: DataTypes.TEXT, allowNull: true },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    helpful_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await queryInterface.createTable('gift__review__images', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    review_id: { type: DataTypes.UUID, allowNull: false },
    image_url: { type: DataTypes.STRING(500), allowNull: false },
    alt_text: { type: DataTypes.STRING(255), allowNull: true },
    sort_order: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('gift__review__images');
  await queryInterface.dropTable('gift__reviews');
}

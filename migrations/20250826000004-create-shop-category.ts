import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('shop_category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    sub_category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'shop',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Add composite index for shop_id and category_id
  await queryInterface.addIndex('shop_category', ['shop_id', 'category_id'], {
    unique: true,
    name: 'shop_category_unique',
  });

  // Add individual indexes
  await queryInterface.addIndex('shop_category', ['shop_id']);
  await queryInterface.addIndex('shop_category', ['category_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('shop_category');
}

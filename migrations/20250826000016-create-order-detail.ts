import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order_detail', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    external_id: {
      type: DataTypes.STRING(30),
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
      onDelete: 'RESTRICT',
    },
    order_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    wallet_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cartItem_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
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

  // Add indexes
  await queryInterface.addIndex('order_detail', ['order_id']);
  await queryInterface.addIndex('order_detail', ['shop_id']);
  await queryInterface.addIndex('order_detail', ['external_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order_detail');
}

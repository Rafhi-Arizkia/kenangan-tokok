import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order_item', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    vendor_fee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    gift_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gift',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  });

  // Add indexes
  await queryInterface.addIndex('order_item', ['order_id']);
  await queryInterface.addIndex('order_item', ['gift_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order_item');
}

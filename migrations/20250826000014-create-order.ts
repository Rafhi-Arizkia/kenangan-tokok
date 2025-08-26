import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order', {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      allowNull: false,
    },
    invoice_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shipper_id: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: true,
    },
    awb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickup_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmation_deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_ordered_for: {
      type: DataTypes.DATE,
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
    order_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order_group',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  // Add indexes
  await queryInterface.addIndex('order', ['shop_id']);
  await queryInterface.addIndex('order', ['order_group_id']);
  await queryInterface.addIndex('order', ['shipper_id']);
  await queryInterface.addIndex('order', ['confirmation_deadline']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order');
}

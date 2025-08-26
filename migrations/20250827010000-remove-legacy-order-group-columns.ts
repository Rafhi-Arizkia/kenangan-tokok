import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // WARNING: this will drop columns and their data. Ensure you have backups if needed.
  await queryInterface.removeColumn('order_group', 'sender_name');
  await queryInterface.removeColumn('order_group', 'sender_phone');
  await queryInterface.removeColumn('order_group', 'sender_email');
  await queryInterface.removeColumn('order_group', 'receiver_name');
  await queryInterface.removeColumn('order_group', 'receiver_phone');
  await queryInterface.removeColumn('order_group', 'receiver_email');
  await queryInterface.removeColumn('order_group', 'shipping_address');
  await queryInterface.removeColumn('order_group', 'shipping_city');
  await queryInterface.removeColumn('order_group', 'shipping_province');
  await queryInterface.removeColumn('order_group', 'shipping_postal_code');
  await queryInterface.removeColumn('order_group', 'subtotal');
  await queryInterface.removeColumn('order_group', 'total_discount');
  await queryInterface.removeColumn('order_group', 'shipping_cost');
  await queryInterface.removeColumn('order_group', 'tax_amount');
  await queryInterface.removeColumn('order_group', 'grand_total');
  await queryInterface.removeColumn('order_group', 'payment_method');
  await queryInterface.removeColumn('order_group', 'notes');
}

export async function down(queryInterface: QueryInterface) {
  // Re-create the legacy columns with their original definitions (as in the original migration)
  await queryInterface.addColumn('order_group', 'sender_name', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'sender_phone', {
    type: DataTypes.STRING(20),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'sender_email', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'receiver_name', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'receiver_phone', {
    type: DataTypes.STRING(20),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'receiver_email', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'shipping_address', {
    type: DataTypes.TEXT,
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'shipping_city', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'shipping_province', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'shipping_postal_code', {
    type: DataTypes.STRING(10),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'subtotal', {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  });
  await queryInterface.addColumn('order_group', 'total_discount', {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  });
  await queryInterface.addColumn('order_group', 'shipping_cost', {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  });
  await queryInterface.addColumn('order_group', 'tax_amount', {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  });
  await queryInterface.addColumn('order_group', 'grand_total', {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  });
  await queryInterface.addColumn('order_group', 'payment_method', {
    type: DataTypes.STRING(50),
    allowNull: true,
  });
  await queryInterface.addColumn('order_group', 'notes', {
    type: DataTypes.TEXT,
    allowNull: true,
  });
}

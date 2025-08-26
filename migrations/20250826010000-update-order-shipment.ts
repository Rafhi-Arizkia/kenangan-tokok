import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Add columns that exist in the model but not in the old migration.
  // Make them nullable to avoid breaking existing rows.
  await queryInterface.addColumn('order_shipment', 'receiver_name', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'receiver_phone', {
    type: DataTypes.STRING(20),
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'sender_name', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'sender_phone', {
    type: DataTypes.STRING(20),
    allowNull: true,
  });

  // Add address fields (migration previously had postal_code fields)
  await queryInterface.addColumn('order_shipment', 'origin_address', {
    type: DataTypes.TEXT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'dest_address', {
    type: DataTypes.TEXT,
    allowNull: true,
  });

  // Add area fields (models expect origin_area / dest_area)
  await queryInterface.addColumn('order_shipment', 'origin_area', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'dest_area', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });

  // Shipment / package related fields
  await queryInterface.addColumn('order_shipment', 'rate_id', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'use_insurance', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });

  await queryInterface.addColumn('order_shipment', 'package_heigth', {
    type: DataTypes.FLOAT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'package_length', {
    type: DataTypes.FLOAT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'package_type', {
    type: DataTypes.FLOAT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'package_price', {
    type: DataTypes.STRING(100),
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'package_weight', {
    type: DataTypes.FLOAT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'package_width', {
    type: DataTypes.FLOAT,
    allowNull: true,
  });

  // Delivery fields
  await queryInterface.addColumn('order_shipment', 'delivery_logistic_name', {
    type: DataTypes.STRING(50),
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'delivery_method', {
    type: DataTypes.TEXT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'delivery_min_day', {
    type: DataTypes.TINYINT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'delivery_max_day', {
    type: DataTypes.TINYINT,
    allowNull: true,
  });

  await queryInterface.addColumn('order_shipment', 'delivery_price', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });

  // Note: existing columns like origin_postal_code / origin_area_id are left intact
  // to avoid destructive changes. If you want to rename/cleanup those older columns
  // we can add a follow-up migration to safely migrate data and drop them.
}

export async function down(queryInterface: QueryInterface) {
  // Remove the columns we added in up
  await queryInterface.removeColumn('order_shipment', 'receiver_name');
  await queryInterface.removeColumn('order_shipment', 'receiver_phone');
  await queryInterface.removeColumn('order_shipment', 'sender_name');
  await queryInterface.removeColumn('order_shipment', 'sender_phone');
  await queryInterface.removeColumn('order_shipment', 'origin_address');
  await queryInterface.removeColumn('order_shipment', 'dest_address');
  await queryInterface.removeColumn('order_shipment', 'origin_area');
  await queryInterface.removeColumn('order_shipment', 'dest_area');
  await queryInterface.removeColumn('order_shipment', 'rate_id');
  await queryInterface.removeColumn('order_shipment', 'use_insurance');
  await queryInterface.removeColumn('order_shipment', 'package_heigth');
  await queryInterface.removeColumn('order_shipment', 'package_length');
  await queryInterface.removeColumn('order_shipment', 'package_type');
  await queryInterface.removeColumn('order_shipment', 'package_price');
  await queryInterface.removeColumn('order_shipment', 'package_weight');
  await queryInterface.removeColumn('order_shipment', 'package_width');
  await queryInterface.removeColumn('order_shipment', 'delivery_logistic_name');
  await queryInterface.removeColumn('order_shipment', 'delivery_method');
  await queryInterface.removeColumn('order_shipment', 'delivery_min_day');
  await queryInterface.removeColumn('order_shipment', 'delivery_max_day');
  await queryInterface.removeColumn('order_shipment', 'delivery_price');
}

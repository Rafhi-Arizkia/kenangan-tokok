import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order_group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    receiver_id: { type: DataTypes.BIGINT, allowNull: true },
    sender_name: { type: DataTypes.STRING(255), allowNull: true },
    sender_phone: { type: DataTypes.STRING(50), allowNull: true },
    sender_email: { type: DataTypes.STRING(255), allowNull: true },
    receiver_name: { type: DataTypes.STRING(255), allowNull: true },
    receiver_phone: { type: DataTypes.STRING(50), allowNull: true },
    receiver_email: { type: DataTypes.STRING(255), allowNull: true },
    shipping_address: { type: DataTypes.TEXT, allowNull: true },
    shipping_city: { type: DataTypes.STRING(255), allowNull: true },
    shipping_province: { type: DataTypes.STRING(255), allowNull: true },
    shipping_postal_code: { type: DataTypes.STRING(10), allowNull: true },
    total_amount: { type: DataTypes.DECIMAL(15,2), allowNull: false, defaultValue: 0 },
    total_discount: { type: DataTypes.DECIMAL(15,2), allowNull: true, defaultValue: 0 },
    shipping_cost: { type: DataTypes.DECIMAL(15,2), allowNull: true, defaultValue: 0 },
    tax_amount: { type: DataTypes.DECIMAL(15,2), allowNull: true, defaultValue: 0 },
    grand_total: { type: DataTypes.DECIMAL(15,2), allowNull: false, defaultValue: 0 },
    payment_method: { type: DataTypes.STRING(50), allowNull: true },
    payment_status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'pending' },
    notes: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });

  await queryInterface.createTable('order', {
    id: { type: DataTypes.STRING(8), primaryKey: true },
    order_group_id: { type: DataTypes.INTEGER, allowNull: false },
    shop_id: { type: DataTypes.BIGINT, allowNull: true },
    order_number: { type: DataTypes.STRING(50), allowNull: true },
    order_status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'pending' },
    total_amount: { type: DataTypes.DECIMAL(15,2), allowNull: false, defaultValue: 0 },
    total_discount: { type: DataTypes.DECIMAL(15,2), allowNull: true, defaultValue: 0 },
    shipping_cost: { type: DataTypes.DECIMAL(15,2), allowNull: true, defaultValue: 0 },
    tax_amount: { type: DataTypes.DECIMAL(15,2), allowNull: true, defaultValue: 0 },
    grand_total: { type: DataTypes.DECIMAL(15,2), allowNull: false, defaultValue: 0 },
    notes: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });

  await queryInterface.createTable('order_item', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.STRING(8), allowNull: false },
    gift_id: { type: DataTypes.BIGINT, allowNull: true },
    gift_name: { type: DataTypes.STRING(255), allowNull: true },
    gift_price: { type: DataTypes.DECIMAL(15,2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    total_price: { type: DataTypes.DECIMAL(15,2), allowNull: false },
    discount_amount: { type: DataTypes.DECIMAL(15,2), allowNull: true, defaultValue: 0 },
    notes: { type: DataTypes.TEXT, allowNull: true },
    variant_info: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });

  await queryInterface.createTable('order_detail', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.STRING(8), allowNull: true },
    shop_id: { type: DataTypes.BIGINT, allowNull: true },
    wallet_id: { type: DataTypes.BIGINT, allowNull: true },
    cartItem_id: { type: DataTypes.BIGINT, allowNull: true },
    detail_type: { type: DataTypes.STRING(100), allowNull: true },
    detail_value: { type: DataTypes.TEXT, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });

  await queryInterface.createTable('order_shipment', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.STRING(8), allowNull: false },
    courier_name: { type: DataTypes.STRING(255), allowNull: true },
    tracking_number: { type: DataTypes.STRING(255), allowNull: true },
    shipping_cost: { type: DataTypes.DECIMAL(15,2), allowNull: true },
    estimated_delivery: { type: DataTypes.DATE, allowNull: true },
    actual_delivery: { type: DataTypes.DATE, allowNull: true },
    shipment_status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'pending' },
    shipping_address: { type: DataTypes.TEXT, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });

  await queryInterface.createTable('order_status', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.STRING(8), allowNull: false },
    status_id: { type: DataTypes.INTEGER, allowNull: true },
    status_name: { type: DataTypes.STRING(100), allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    changed_by: { type: DataTypes.BIGINT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  });

  await queryInterface.createTable('order_status_names', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    color: { type: DataTypes.STRING(7), allowNull: true },
    sort_order: { type: DataTypes.INTEGER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order_status_names');
  await queryInterface.dropTable('order_status');
  await queryInterface.dropTable('order_shipment');
  await queryInterface.dropTable('order_detail');
  await queryInterface.dropTable('order_item');
  await queryInterface.dropTable('order');
  await queryInterface.dropTable('order_group');
}

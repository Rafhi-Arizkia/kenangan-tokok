import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order_group', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    sender_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sender_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    sender_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    receiver_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    receiver_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    receiver_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shipping_city: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shipping_province: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shipping_postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total_discount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    tax_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    grand_total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    targeted_receiver_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    receiver_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    confirm_gift_by: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Add indexes
  await queryInterface.addIndex('order_group', ['buyer_id']);
  await queryInterface.addIndex('order_group', ['receiver_id']);
  await queryInterface.addIndex('order_group', ['created_at']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order_group');
}

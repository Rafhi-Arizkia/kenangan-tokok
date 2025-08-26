import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderGroupAttributes {
  id: number;
  buyer_id: number;
  receiver_id?: number | null;
  sender_name?: string | null;
  sender_phone?: string | null;
  sender_email?: string | null;
  receiver_name?: string | null;
  receiver_phone?: string | null;
  receiver_email?: string | null;
  shipping_address?: string | null;
  shipping_city?: string | null;
  shipping_province?: string | null;
  shipping_postal_code?: string | null;
  subtotal: number;
  total_discount: number;
  shipping_cost: number;
  tax_amount: number;
  grand_total: number;
  payment_method?: string | null;
  notes?: string | null;
  targeted_receiver_name?: string | null;
  message?: string | null;
  receiver_message?: string | null;
  confirm_gift_by?: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface OrderGroupCreationAttributes
  extends Optional<
    OrderGroupAttributes,
    | 'id'
    | 'receiver_id'
    | 'sender_name'
    | 'sender_phone'
    | 'sender_email'
    | 'receiver_name'
    | 'receiver_phone'
    | 'receiver_email'
    | 'shipping_address'
    | 'shipping_city'
    | 'shipping_province'
    | 'shipping_postal_code'
    | 'total_discount'
    | 'shipping_cost'
    | 'tax_amount'
    | 'payment_method'
    | 'notes'
    | 'targeted_receiver_name'
    | 'message'
    | 'receiver_message'
    | 'confirm_gift_by'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
  > {}

class OrderGroupModel
  extends Model<OrderGroupAttributes, OrderGroupCreationAttributes>
  implements OrderGroupAttributes
{
  public id!: number;
  public buyer_id!: number;
  public receiver_id?: number | null;
  public sender_name?: string | null;
  public sender_phone?: string | null;
  public sender_email?: string | null;
  public receiver_name?: string | null;
  public receiver_phone?: string | null;
  public receiver_email?: string | null;
  public shipping_address?: string | null;
  public shipping_city?: string | null;
  public shipping_province?: string | null;
  public shipping_postal_code?: string | null;
  public subtotal!: number;
  public total_discount!: number;
  public shipping_cost!: number;
  public tax_amount!: number;
  public grand_total!: number;
  public payment_method?: string | null;
  public notes?: string | null;
  public targeted_receiver_name?: string | null;
  public message?: string | null;
  public receiver_message?: string | null;
  public confirm_gift_by?: Date | null;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date | null;

  // Static association method
  public static associate(models: any) {
    OrderGroupModel.hasMany(models.Order, {
      foreignKey: 'order_group_id',
      as: 'orders',
    });
  }
}

OrderGroupModel.init(
  {
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
      allowNull: true
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
  },
  {
    sequelize,
    modelName: 'OrderGroup',
    tableName: 'order_group',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
  }
);

export { OrderGroupModel };

import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderGroupAttributes {
  id: number;
  receiver_id?: number;
  sender_name?: string;
  sender_phone?: string;
  sender_email?: string;
  receiver_name?: string;
  receiver_phone?: string;
  receiver_email?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_province?: string;
  shipping_postal_code?: string;
  total_amount: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  payment_method?: string;
  payment_status: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

interface OrderGroupCreationAttributes extends Optional<OrderGroupAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class OrderGroupModel extends Model<OrderGroupAttributes, OrderGroupCreationAttributes> implements OrderGroupAttributes {
  public id!: number;
  public receiver_id?: number;
  public sender_name?: string;
  public sender_phone?: string;
  public sender_email?: string;
  public receiver_name?: string;
  public receiver_phone?: string;
  public receiver_email?: string;
  public shipping_address?: string;
  public shipping_city?: string;
  public shipping_province?: string;
  public shipping_postal_code?: string;
  public total_amount!: number;
  public total_discount?: number;
  public shipping_cost?: number;
  public tax_amount?: number;
  public grand_total!: number;
  public payment_method?: string;
  public payment_status!: string;
  public notes?: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

OrderGroupModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.STRING(50),
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
      type: DataTypes.STRING(50),
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
    total_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total_discount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: 0,
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: 0,
    },
    tax_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
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
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'pending',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
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
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

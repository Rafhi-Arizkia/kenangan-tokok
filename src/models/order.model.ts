import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderAttributes {
  id: string;
  order_group_id: number;
  shop_id?: number;
  order_number?: string;
  order_status: string;
  total_amount: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'created_at' | 'updated_at'> {}

export class OrderModel extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public order_group_id!: number;
  public shop_id?: number;
  public order_number?: string;
  public order_status!: string;
  public total_amount!: number;
  public total_discount?: number;
  public shipping_cost?: number;
  public tax_amount?: number;
  public grand_total!: number;
  public notes?: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    order_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order_group',
        key: 'id',
      },
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'shop',
        key: 'id',
      },
    },
    order_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    order_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'pending',
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
    modelName: 'Order',
    tableName: 'order',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

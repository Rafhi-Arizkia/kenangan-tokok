import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderItemAttributes {
  id: number;
  order_id: string;
  gift_id?: number;
  gift_name?: string;
  gift_price: number;
  quantity: number;
  total_price: number;
  discount_amount?: number;
  notes?: string;
  variant_info?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class OrderItemModel extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number;
  public order_id!: string;
  public gift_id?: number;
  public gift_name?: string;
  public gift_price!: number;
  public quantity!: number;
  public total_price!: number;
  public discount_amount?: number;
  public notes?: string;
  public variant_info?: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

OrderItemModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
    },
    gift_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'gift',
        key: 'id',
      },
    },
    gift_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gift_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    total_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    discount_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: 0,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    variant_info: {
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
    modelName: 'OrderItem',
    tableName: 'order_item',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

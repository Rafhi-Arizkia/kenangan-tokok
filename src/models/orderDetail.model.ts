import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderDetailAttributes {
  id: number;
  order_id?: string;
  shop_id?: number;
  wallet_id?: number;
  cartItem_id?: number;
  detail_type?: string;
  detail_value?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
  public id!: number;
  public order_id?: string;
  public shop_id?: number;
  public wallet_id?: number;
  public cartItem_id?: number;
  public detail_type?: string;
  public detail_value?: string;
  public notes?: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

OrderDetail.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: 'order',
        key: 'id',
      },
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    wallet_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    cartItem_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    detail_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    detail_value: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'OrderDetail',
    tableName: 'order_detail',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

// Export with Model suffix for consistency
export { OrderDetail as OrderDetailModel };

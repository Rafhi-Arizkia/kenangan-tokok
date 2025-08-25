import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderStatusAttributes {
  id: number;
  order_id: string;
  status_id?: number;
  status_name?: string;
  notes?: string;
  changed_by?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface OrderStatusCreationAttributes extends Optional<OrderStatusAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class OrderStatus extends Model<OrderStatusAttributes, OrderStatusCreationAttributes> implements OrderStatusAttributes {
  public id!: number;
  public order_id!: string;
  public status_id?: number;
  public status_name?: string;
  public notes?: string;
  public changed_by?: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

OrderStatus.init(
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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order_status_names',
        key: 'id',
      },
    },
    status_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    changed_by: {
      type: DataTypes.BIGINT,
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
    modelName: 'OrderStatus',
    tableName: 'order_status',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

// Export with Model suffix for consistency
export { OrderStatus as OrderStatusModel };

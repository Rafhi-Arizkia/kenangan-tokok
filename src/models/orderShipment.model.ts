import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderShipmentAttributes {
  id: number;
  order_id: string;
  courier_name?: string;
  tracking_number?: string;
  shipping_cost?: number;
  estimated_delivery?: Date;
  actual_delivery?: Date;
  shipment_status: string;
  shipping_address?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface OrderShipmentCreationAttributes extends Optional<OrderShipmentAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class OrderShipment extends Model<OrderShipmentAttributes, OrderShipmentCreationAttributes> implements OrderShipmentAttributes {
  public id!: number;
  public order_id!: string;
  public courier_name?: string;
  public tracking_number?: string;
  public shipping_cost?: number;
  public estimated_delivery?: Date;
  public actual_delivery?: Date;
  public shipment_status!: string;
  public shipping_address?: string;
  public notes?: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

OrderShipment.init(
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
    courier_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tracking_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    estimated_delivery: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actual_delivery: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shipment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'pending',
    },
    shipping_address: {
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
    modelName: 'OrderShipment',
    tableName: 'order_shipment',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

// Export with Model suffix for consistency
export { OrderShipment as OrderShipmentModel };

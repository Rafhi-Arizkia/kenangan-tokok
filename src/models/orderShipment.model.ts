import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderShipmentAttributes {
  id: number;
  receiver_name: string;
  receiver_phone: string;
  sender_name: string;
  sender_phone: string;
  origin_lat: string;
  origin_lng: string;
  origin_address: string;
  origin_description?: string;
  origin_area: number;
  origin_postal_code: string;
  origin_area_id: number;
  origin_suburb_id: number;
  dest_lat: string;
  dest_lng: string;
  dest_address: string;
  dest_description?: string;
  dest_area: number;
  dest_postal_code: string;
  dest_area_id: number;
  dest_suburb_id: number;
  rate_id: number;
  use_insurance: boolean;
  package_heigth: number;
  package_length: number;
  package_type: number;
  package_price: string;
  package_weight: number;
  package_width: number;
  order_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  delivery_logistic_name: string;
  delivery_method: string;
  delivery_min_day: number;
  delivery_max_day: number;
  delivery_price: number;
}

export interface OrderShipmentCreationAttributes
  extends Optional<OrderShipmentAttributes, 'id' | 'origin_description' | 'dest_description' | 'deletedAt'> {}

export class OrderShipmentModel
  extends Model<OrderShipmentAttributes, OrderShipmentCreationAttributes>
  implements OrderShipmentAttributes
{
  declare id: number;
  declare receiver_name: string;
  declare receiver_phone: string;
  declare sender_name: string;
  declare sender_phone: string;
  declare origin_lat: string;
  declare origin_lng: string;
  declare origin_address: string;
  declare origin_description?: string;
  declare origin_area: number;
  declare origin_postal_code: string;
  declare origin_area_id: number;
  declare origin_suburb_id: number;
  declare dest_lat: string;
  declare dest_lng: string;
  declare dest_address: string;
  declare dest_description?: string;
  declare dest_area: number;
  declare dest_postal_code: string;
  declare dest_area_id: number;
  declare dest_suburb_id: number;
  declare rate_id: number;
  declare use_insurance: boolean;
  declare package_heigth: number;
  declare package_length: number;
  declare package_type: number;
  declare package_price: string;
  declare package_weight: number;
  declare package_width: number;
  declare order_id: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;
  declare delivery_logistic_name: string;
  declare delivery_method: string;
  declare delivery_min_day: number;
  declare delivery_max_day: number;
  declare delivery_price: number;

  // associations
  public static associate(models: any) {
    OrderShipmentModel.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id',
    });
  }
}

OrderShipmentModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    receiver_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    receiver_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    sender_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sender_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    origin_lat: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    origin_lng: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    origin_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    origin_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    origin_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_postal_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    origin_area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_suburb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dest_lat: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dest_lng: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dest_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dest_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dest_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dest_postal_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    dest_area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dest_suburb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_insurance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    package_heigth: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    package_length: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    package_type: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    package_price: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    package_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    package_width: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
      references: {
        model: 'order',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    delivery_logistic_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    delivery_method: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    delivery_min_day: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    delivery_max_day: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    delivery_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: false,
    modelName: 'OrderShipment',
    tableName: 'order_shipment',
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);


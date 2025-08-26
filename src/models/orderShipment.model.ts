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
  dest_lat: string;
  dest_lng: string;
  dest_address: string;
  dest_description?: string;
  dest_area: number;
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
  public id!: number;
  public receiver_name!: string;
  public receiver_phone!: string;
  public sender_name!: string;
  public sender_phone!: string;
  public origin_lat!: string;
  public origin_lng!: string;
  public origin_address!: string;
  public origin_description?: string;
  public origin_area!: number;
  public dest_lat!: string;
  public dest_lng!: string;
  public dest_address!: string;
  public dest_description?: string;
  public dest_area!: number;
  public rate_id!: number;
  public use_insurance!: boolean;
  public package_heigth!: number;
  public package_length!: number;
  public package_type!: number;
  public package_price!: string;
  public package_weight!: number;
  public package_width!: number;
  public order_id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
  public delivery_logistic_name!: string;
  public delivery_method!: string;
  public delivery_min_day!: number;
  public delivery_max_day!: number;
  public delivery_price!: number;

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


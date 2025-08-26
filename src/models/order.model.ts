import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

export interface OrderAttributes {
  id: string;
  invoice_url?: string | null;
  shipper_id?: string | null;
  awb?: string | null;
  pickup_code?: string | null;
  confirmation_deadline: Date;
  date_ordered_for: Date;
  shop_id: string;
  order_group_id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    "invoice_url" | "shipper_id" | "awb" | "pickup_code"
  > {}

export class OrderModel
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public invoice_url!: string | null;
  public shipper_id!: string | null;
  public awb!: string | null;
  public pickup_code!: string | null;
  public confirmation_deadline!: Date;
  public date_ordered_for!: Date;
  public shop_id!: string;
  public order_group_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  // associations
  public static associate(models: any) {
    OrderModel.belongsTo(models.Shop, {
      as: "shop",
      foreignKey: "shop_id",
    });
    OrderModel.hasOne(models.OrderShipment, {
      as: "shipment",
      foreignKey: "order_id",
    });
    OrderModel.hasMany(models.OrderItem, {
      as: "items",
      foreignKey: "order_id",
    });
    OrderModel.hasMany(models.OrderStatus, {
      as: {
        singular: "status",
        plural: "statuses",
      },
      foreignKey: "order_id",
    });
    OrderModel.belongsTo(models.OrderGroup, {
      as: "order_group",
      foreignKey: "order_group_id",
    });
  }
}

OrderModel.init(
  {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    invoice_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shipper_id: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: true,
    },
    awb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickup_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmation_deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_ordered_for: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    order_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: false,
    modelName: "Order",
    tableName: "order",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

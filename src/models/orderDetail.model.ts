import {
  Model,
  DataTypes,
  Optional
} from "sequelize";
import { sequelize } from "../database/connection";

export interface OrderDetailAttributes {
  id: number;
  external_id: string;
  shop_id: number;
  order_id: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface OrderDetailCreationAttributes
  extends Optional<
    OrderDetailAttributes,
    "id" | "deletedAt"
  > {}

export class OrderDetailModel
  extends Model<OrderDetailAttributes, OrderDetailCreationAttributes>
  implements OrderDetailAttributes
{
  public id!: number;
  public external_id!: string;
  public shop_id!: number;
  public order_id!: string;
  public amount!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

OrderDetailModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    external_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
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
    modelName: "OrderDetail",
    tableName: "order_detail",
    timestamps: true,
    paranoid: true,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

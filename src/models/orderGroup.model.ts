import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/connection";

export interface OrderGroupAttributes {
  id: number;
  buyer_id: number;
  receiver_id?: number | null;
  is_gift: number;
  is_surprise: number;
  is_hidden: number;
  reference_code: string;
  payment_gateway_fee: number;
  targeted_receiver_name?: string | null;
  type_device: "MOBILE" | "WEB";
  service_fee: number;
  message?: string | null;
  receiver_message?: string | null;
  confirm_gift_by?: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface OrderGroupCreationAttributes
  extends Optional<
    OrderGroupAttributes,
    | "id"
    | "receiver_id"
    | "is_gift"
    | "is_surprise"
    | "is_hidden"
    | "reference_code"
    | "payment_gateway_fee"
    | "targeted_receiver_name"
    | "type_device"
    | "service_fee"
    | "message"
    | "receiver_message"
    | "confirm_gift_by"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

class OrderGroupModel
  extends Model<OrderGroupAttributes, OrderGroupCreationAttributes>
  implements OrderGroupAttributes
{
  declare id: number;
  declare buyer_id: number;
  declare receiver_id?: number | null;
  declare is_gift: number;
  declare is_surprise: number;
  declare is_hidden: number;
  declare reference_code: string;
  declare payment_gateway_fee: number;
  declare targeted_receiver_name?: string | null;
  declare type_device: "MOBILE" | "WEB";
  declare service_fee: number;
  declare message?: string | null;
  declare receiver_message?: string | null;
  // `confirm_gift_by` digunakan untuk menyimpan user yang mengkonfirmasi gift
  // pada saat user tanpa aplikasi melakukan konfirmasi gift
  declare confirm_gift_by?: number | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date | null;

  // Static association method
  public static associate(models: any) {
    OrderGroupModel.hasMany(models.Order, {
      foreignKey: "order_group_id",
      as: "orders",
    });
  }
}

OrderGroupModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    is_gift: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    is_surprise: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    is_hidden: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    reference_code: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    payment_gateway_fee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    targeted_receiver_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type_device: {
      type: DataTypes.ENUM("MOBILE", "WEB"),
      defaultValue: "MOBILE",
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    receiver_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // `confirm_gift_by` digunakan untuk menyimpan user yang mengkonfirmasi gift
    // pada saat user tanpa aplikasi melakukan konfirmasi gift
    // ini otomatis terisi oleh code di `server/app/api-mobile/v3/user/order-no-app/
    confirm_gift_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
    },
    service_fee: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
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
    modelName: "OrderGroup",
    tableName: "order_group",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

export { OrderGroupModel };

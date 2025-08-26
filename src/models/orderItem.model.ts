import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderItemAttributes {
  id: number;
  name: string;
  price: number;
  vendor_fee: number;
  qty: number;
  note?: string;
  photo: string;
  order_id: string;
  gift_id: number;
}

export interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, 'id' | 'vendor_fee' | 'note'> {}

export class OrderItemModel
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public vendor_fee!: number;
  public qty!: number;
  public note?: string;
  public photo!: string;
  public order_id!: string;
  public gift_id!: number;

  // associations
  public static associate(models: any) {
    OrderItemModel.belongsTo(models.Gift, {
      as: 'gift',
      foreignKey: 'gift_id',
    });
    OrderItemModel.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id',
    });
  }
}

OrderItemModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    vendor_fee: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
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
      allowNull: false,
      references: {
        model: 'gift',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_item',
    timestamps: false, // JS version tidak ada createdAt/updatedAt/deletedAt
  }
);
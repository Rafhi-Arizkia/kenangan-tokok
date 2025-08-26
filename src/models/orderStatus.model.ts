import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderStatusAttributes {
  id: number;
  status_name_id: number;
  description?: string;
  order_id: string;
}

export interface OrderStatusCreationAttributes
  extends Optional<OrderStatusAttributes, 'id' | 'description'> {}

export class OrderStatus
  extends Model<OrderStatusAttributes, OrderStatusCreationAttributes>
  implements OrderStatusAttributes
{
  declare id: number;
  declare status_name_id: number;
  declare description?: string;
  declare order_id: string;
}

OrderStatus.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    status_name_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'order_status',
    modelName: 'OrderStatus',
    timestamps: false, // kalau butuh createdAt/updatedAt tinggal aktifkan
  }
);

export { OrderStatus as OrderStatusModel };

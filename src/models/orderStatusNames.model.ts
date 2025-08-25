import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderStatusNamesAttributes {
  id: number;
  name: string;
  description?: string;
  color?: string;
  sort_order?: number;
  is_active: boolean;
}

export interface OrderStatusNamesCreationAttributes extends Optional<OrderStatusNamesAttributes, 'id'> {}

export class OrderStatusNames extends Model<OrderStatusNamesAttributes, OrderStatusNamesCreationAttributes> implements OrderStatusNamesAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public color?: string;
  public sort_order?: number;
  public is_active!: boolean;
}

OrderStatusNames.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'OrderStatusNames',
    tableName: 'order_status_names',
    timestamps: false,
  }
);

// Export with Model suffix for consistency
export { OrderStatusNames as OrderStatusNamesModel };

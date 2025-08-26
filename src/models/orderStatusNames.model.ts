import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderStatusNamesAttributes {
  id: number;
  name: string;
  aliases_ind: string;
}

export interface OrderStatusNamesCreationAttributes
  extends Optional<OrderStatusNamesAttributes, 'id'> {}

export class OrderStatusNames
  extends Model<OrderStatusNamesAttributes, OrderStatusNamesCreationAttributes>
  implements OrderStatusNamesAttributes
{
  declare id: number;
  declare name: string;
  declare aliases_ind: string;
}

OrderStatusNames.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    aliases_ind: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'Batal',
    },
  },
  {
    sequelize,
    modelName: 'OrderStatusNames',
    tableName: 'order_status_names',
    paranoid: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  }
);

export { OrderStatusNames as OrderStatusNamesModel };

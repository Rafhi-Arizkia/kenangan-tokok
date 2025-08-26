import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface CategoryAttributes {
  id: number;
  name?: string;
  parent_id?: number;
  image_url?: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes 
{
  declare id: number;
  declare name?: string;
  declare parent_id?: number;
  declare image_url?: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: false, // sesuai kode awal
    paranoid: false,
  }
);

export { Category as CategoryModel };

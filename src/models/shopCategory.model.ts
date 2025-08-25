import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export interface ShopCategoryAttributes {
  id: number;
  shop_id: number;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ShopCategoryCreationAttributes extends Omit<ShopCategoryAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class ShopCategoryModel extends Model<ShopCategoryAttributes, ShopCategoryCreationAttributes> implements ShopCategoryAttributes {
  public id!: number;
  public shop_id!: number;
  public category_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ShopCategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shops',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'shop_categories',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['shop_id', 'category_id'],
      },
    ],
  }
);

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface ShopCategoryAttributes {
  id: number;
  category_id: number;
  sub_category: string;
  shop_id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ShopCategoryCreationAttributes
  extends Optional<ShopCategoryAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class ShopCategoryModel
  extends Model<ShopCategoryAttributes, ShopCategoryCreationAttributes>
  implements ShopCategoryAttributes
{
  public id!: number;
  public category_id!: number;
  public sub_category!: string;
  public shop_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;
}

ShopCategoryModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shop_id: {
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
    tableName: 'shop_category',
    timestamps: true,
    paranoid: true, // untuk soft delete → gunakan deletedAt
  }
);

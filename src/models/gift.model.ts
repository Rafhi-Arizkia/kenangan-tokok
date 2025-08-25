import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftAttributes {
  id: number;
  shop_id: number;
  category_id?: number;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  weight?: number;
  stock?: number;
  min_order?: number;
  max_order?: number;
  is_active: boolean;
  is_featured: boolean;
  sku?: string;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
  rating?: number;
  total_reviews?: number;
  total_sold?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

interface GiftCreationAttributes extends Optional<GiftAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class GiftModel extends Model<GiftAttributes, GiftCreationAttributes> implements GiftAttributes {
  public id!: number;
  public shop_id!: number;
  public category_id?: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public discount_price?: number;
  public weight?: number;
  public stock?: number;
  public min_order?: number;
  public max_order?: number;
  public is_active!: boolean;
  public is_featured!: boolean;
  public sku?: string;
  public tags?: string;
  public meta_title?: string;
  public meta_description?: string;
  public rating?: number;
  public total_reviews?: number;
  public total_sold?: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

GiftModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    max_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meta_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
    total_reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Gift',
    tableName: 'gift',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

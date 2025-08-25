import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface ShopAttributes {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  is_active: boolean;
  is_verified: boolean;
  rating?: number;
  total_products?: number;
  total_orders?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

interface ShopCreationAttributes extends Optional<ShopAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class Shop extends Model<ShopAttributes, ShopCreationAttributes> implements ShopAttributes {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public description?: string;
  public logo?: string;
  public banner?: string;
  public phone?: string;
  public email?: string;
  public website?: string;
  public address?: string;
  public city?: string;
  public province?: string;
  public postal_code?: string;
  public is_active!: boolean;
  public is_verified!: boolean;
  public rating?: number;
  public total_products?: number;
  public total_orders?: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

Shop.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    banner: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
    total_products: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_orders: {
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
    modelName: 'Shop',
    tableName: 'shop',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

// Export with Model suffix for consistency
export { Shop as ShopModel };

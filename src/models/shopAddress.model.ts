import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';
import { v4 as uuidV4 } from 'uuid';

export interface ShopAddressAttributes {
  id: string;
  shop_id: number;
  working_hours?: string;
  is_open: boolean;
  address?: string;
  address_description?: string;
  area_id?: number;
  suburb_id?: number;
  postal_code?: string;
  city?: string;
  kecamatan?: string;
  kelurahan?: string;
  lat?: string;
  lng?: string;
  filter__province_id?: number;
}

export interface ShopAddressCreationAttributes
  extends Optional<ShopAddressAttributes, 'id' | 'is_open'> {}

export class ShopAddress
  extends Model<ShopAddressAttributes, ShopAddressCreationAttributes>
  implements ShopAddressAttributes
{
  public id!: string;
  public shop_id!: number;
  public working_hours?: string;
  public is_open!: boolean;
  public address?: string;
  public address_description?: string;
  public area_id?: number;
  public suburb_id?: number;
  public postal_code?: string;
  public city?: string;
  public kecamatan?: string;
  public kelurahan?: string;
  public lat?: string;
  public lng?: string;
  public filter__province_id?: number;
}

ShopAddress.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidV4,
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    working_hours: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_open: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    suburb_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    kecamatan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    kelurahan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lat: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lng: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    filter__province_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ShopAddress',
    tableName: 'shop_address',
    timestamps: false,
  }
);

// Export dengan nama konsisten
export { ShopAddress as ShopAddressModel };

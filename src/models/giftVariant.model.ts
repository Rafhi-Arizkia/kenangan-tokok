import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftVariantAttributes {
  id: number;
  gift_id?: number;
  variant_name: string;
  variant_value: string;
  price_adjustment?: number;
  stock?: number;
  sku?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface GiftVariantCreationAttributes extends Optional<GiftVariantAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class GiftVariant extends Model<GiftVariantAttributes, GiftVariantCreationAttributes> implements GiftVariantAttributes {
  public id!: number;
  public gift_id?: number;
  public variant_name!: string;
  public variant_value!: string;
  public price_adjustment?: number;
  public stock?: number;
  public sku?: string;
  public is_active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}

GiftVariant.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    gift_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'gift',
        key: 'id',
      },
    },
    variant_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    variant_value: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price_adjustment: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'GiftVariant',
    tableName: 'gift__variants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Export with Model suffix for consistency
export { GiftVariant as GiftVariantModel };

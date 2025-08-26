import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftVariantAttributes {
  id: number;
  gift_id?: number;
  variant_key1: string;
  variant_key2?: string;
  variant_value1: string;
  variant_value2?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface GiftVariantCreationAttributes
  extends Optional<GiftVariantAttributes, 'id' | 'gift_id' | 'variant_key2' | 'variant_value2' | 'deleted_at' | 'created_at' | 'updated_at'> {}

export class GiftVariant extends Model<GiftVariantAttributes, GiftVariantCreationAttributes>
  implements GiftVariantAttributes {
  declare id: number;
  declare gift_id?: number;
  declare variant_key1: string;
  declare variant_key2?: string;
  declare variant_value1: string;
  declare variant_value2?: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date | null;
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
    variant_key1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variant_key2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    variant_value1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    variant_value2: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'GiftVariant',
    tableName: 'gift__variants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true, // supaya deleted_at ikut terkelola
    deletedAt: 'deleted_at',
  }
);

export { GiftVariant as GiftVariantModel };

import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftImageAttributes {
  id: string;
  gift_id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order?: number;
  created_at: Date;
  updated_at: Date;
}

export interface GiftImageCreationAttributes extends Optional<GiftImageAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class GiftImage extends Model<GiftImageAttributes, GiftImageCreationAttributes> implements GiftImageAttributes {
  public id!: string;
  public gift_id!: number;
  public image_url!: string;
  public alt_text?: string;
  public is_primary!: boolean;
  public sort_order?: number;
  public created_at!: Date;
  public updated_at!: Date;
}

GiftImage.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    gift_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'gift',
        key: 'id',
      },
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    alt_text: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    modelName: 'GiftImage',
    tableName: 'gift__images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Export with Model suffix for consistency
export { GiftImage as GiftImageModel };

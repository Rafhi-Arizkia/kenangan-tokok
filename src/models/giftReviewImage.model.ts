import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftReviewImageAttributes {
  id: string;
  review_id: string;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
  created_at: Date;
  updated_at: Date;
}

export interface GiftReviewImageCreationAttributes extends Optional<GiftReviewImageAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class GiftReviewImage extends Model<GiftReviewImageAttributes, GiftReviewImageCreationAttributes> implements GiftReviewImageAttributes {
  public id!: string;
  public review_id!: string;
  public image_url!: string;
  public alt_text?: string;
  public sort_order?: number;
  public created_at!: Date;
  public updated_at!: Date;
}

GiftReviewImage.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    review_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'gift__reviews',
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
    modelName: 'GiftReviewImage',
    tableName: 'gift__review__images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Export with Model suffix for consistency
export { GiftReviewImage as GiftReviewImageModel };

import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftReviewAttributes {
  id: string;
  gift_id: number;
  order_item_id?: number;
  user_id?: number;
  rating: number;
  review_text?: string;
  is_verified: boolean;
  is_approved: boolean;
  helpful_count?: number;
  created_at: Date;
  updated_at: Date;
}

export interface GiftReviewCreationAttributes extends Optional<GiftReviewAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class GiftReview extends Model<GiftReviewAttributes, GiftReviewCreationAttributes> implements GiftReviewAttributes {
  public id!: string;
  public gift_id!: number;
  public order_item_id?: number;
  public user_id?: number;
  public rating!: number;
  public review_text?: string;
  public is_verified!: boolean;
  public is_approved!: boolean;
  public helpful_count?: number;
  public created_at!: Date;
  public updated_at!: Date;
}

GiftReview.init(
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
    order_item_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'order_item',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    helpful_count: {
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
  },
  {
    sequelize,
    modelName: 'GiftReview',
    tableName: 'gift__reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Export with Model suffix for consistency
export { GiftReview as GiftReviewModel };

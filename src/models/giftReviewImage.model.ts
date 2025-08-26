import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftReviewImageAttributes {
  id: string;
  review_id: string;
  url?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface GiftReviewImageCreationAttributes 
  extends Optional<GiftReviewImageAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {}

export class GiftReviewImage 
  extends Model<GiftReviewImageAttributes, GiftReviewImageCreationAttributes> 
  implements GiftReviewImageAttributes {
  public id!: string;
  public review_id!: string;
  public url?: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
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
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    url: {
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
    modelName: 'GiftReviewImage',
    tableName: 'gift__review__images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
  }
);

export { GiftReviewImage as GiftReviewImageModel };

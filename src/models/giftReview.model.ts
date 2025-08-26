import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftReviewAttributes {
  id: string;
  gift_id: number;
  user_id?: number;
  order_item_id?: number;
  display_name?: string;
  message: string;
  rating: number;
  external_id?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface GiftReviewCreationAttributes
  extends Optional<
    GiftReviewAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

export class GiftReview
  extends Model<GiftReviewAttributes, GiftReviewCreationAttributes>
  implements GiftReviewAttributes
{
  public id!: string;
  public gift_id!: number;
  public user_id?: number;
  public order_item_id?: number;
  public display_name?: string;
  public message!: string;
  public rating!: number;
  public external_id?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
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
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    order_item_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'order_item',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    display_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    external_id: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'GiftReview',
    tableName: 'gift__reviews',
    timestamps: true,
    paranoid: true, // supaya Sequelize handle deletedAt otomatis
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

export { GiftReview as GiftReviewModel };

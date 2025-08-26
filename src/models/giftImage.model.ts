import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftImageAttributes {
  id: string;
  gift_id: number;
  url: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface GiftImageCreationAttributes
  extends Optional<GiftImageAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {}

export class GiftImage
  extends Model<GiftImageAttributes, GiftImageCreationAttributes>
  implements GiftImageAttributes
{
  declare id: string;
  declare gift_id: number;
  declare url: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at?: Date;
}

GiftImage.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    modelName: 'GiftImage',
    tableName: 'gift__images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
  }
);

export { GiftImage as GiftImageModel };

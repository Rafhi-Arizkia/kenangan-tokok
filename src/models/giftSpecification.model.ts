import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftSpecificationAttributes {
  id: string;
  gift_id: number;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface GiftSpecificationCreationAttributes
  extends Optional<GiftSpecificationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class GiftSpecification
  extends Model<GiftSpecificationAttributes, GiftSpecificationCreationAttributes>
  implements GiftSpecificationAttributes 
{
  public id!: string;
  public gift_id!: number;
  public key!: string;
  public value!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;
}

GiftSpecification.init(
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
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'GiftSpecification',
    tableName: 'gift__specifications',
    timestamps: true,
    paranoid: true, // supaya deletedAt dipakai untuk soft delete
  }
);

export { GiftSpecification as GiftSpecificationModel };

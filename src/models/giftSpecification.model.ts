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
  declare id: string;
  declare gift_id: number;
  declare key: string;
  declare value: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date | null;
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
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

export { GiftSpecification as GiftSpecificationModel };

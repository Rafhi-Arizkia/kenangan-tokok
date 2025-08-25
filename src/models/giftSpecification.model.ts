import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftSpecificationAttributes {
  id: string;
  gift_id: number;
  name: string;
  value: string;
  unit?: string;
  sort_order?: number;
  created_at: Date;
  updated_at: Date;
}

export interface GiftSpecificationCreationAttributes extends Optional<GiftSpecificationAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class GiftSpecification extends Model<GiftSpecificationAttributes, GiftSpecificationCreationAttributes> implements GiftSpecificationAttributes {
  public id!: string;
  public gift_id!: number;
  public name!: string;
  public value!: string;
  public unit?: string;
  public sort_order?: number;
  public created_at!: Date;
  public updated_at!: Date;
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
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(50),
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
    modelName: 'GiftSpecification',
    tableName: 'gift__specifications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Export with Model suffix for consistency
export { GiftSpecification as GiftSpecificationModel };

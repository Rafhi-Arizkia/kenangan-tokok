import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface GiftSpecificationFilterBlacklistAttributes {
  name: string;
}

export interface GiftSpecificationFilterBlacklistCreationAttributes
  extends Optional<GiftSpecificationFilterBlacklistAttributes, never> {}

export class GiftSpecificationFilterBlacklist
  extends Model<
    GiftSpecificationFilterBlacklistAttributes,
    GiftSpecificationFilterBlacklistCreationAttributes
  >
  implements GiftSpecificationFilterBlacklistAttributes
{
  public name!: string;
}

GiftSpecificationFilterBlacklist.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'GiftSpecificationFilterBlacklist',
    tableName: 'gift__specifications__filter_blacklist',
    timestamps: false,
    paranoid: false,
  }
);

export { GiftSpecificationFilterBlacklist as GiftSpecificationFilterBlacklistModel };

import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/connection";

export interface ShopAttributes {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  display_address?: string;
  photo?: string;
  phone?: string;
  contact?: string;
  fee_percent?: number;
  bank_type?: string;
  bank_number?: string;
  bank_name?: string;
  use_shipper?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  is_can_claim: number; // TINYINT(1) → pakai number (0/1)
  is_claimed: number; // TINYINT(1) → pakai number (0/1)
}

export interface ShopCreationAttributes
  extends Optional<ShopAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Shop
  extends Model<ShopAttributes, ShopCreationAttributes>
  implements ShopAttributes
{
  public id!: number;
  public user_id!: number;
  public name!: string;
  public description?: string;
  public display_address?: string;
  public photo?: string;
  public phone?: string;
  public contact?: string;
  public fee_percent?: number;
  public bank_type?: string;
  public bank_number?: string;
  public bank_name?: string;
  public use_shipper?: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
  public is_can_claim!: number;
  public is_claimed!: number;
}

Shop.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    display_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    contact: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fee_percent: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    bank_type: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    bank_number: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    bank_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    use_shipper: {
      type: DataTypes.BOOLEAN,
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
    is_can_claim: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 1,
    },
    is_claimed: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Shop",
    tableName: "shop",
    indexes: [
      {
        type: "FULLTEXT",
        name: "shop_name_idx",
        fields: ["name"],
      },
    ],
    timestamps: true,
    paranoid: true,
    underscored: false,
    // Explicitly map timestamp attributes to camelCase column names
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

export { Shop as ShopModel };

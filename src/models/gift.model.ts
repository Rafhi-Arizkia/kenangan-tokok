import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/connection";

export interface GiftAttributes {
  id: number;
  shop_id: number;
  category_id: number;
  sub_category: string;
  name: string;
  description: string;
  price: number;
  total_sold: number;
  photo: string;
  minimum_days: number;
  is_available: boolean;
  weight: number;
  height: number;
  width: number;
  length: number;
  external_id?: string | null;
  external_url?: string | null;
  rating?: number | null;
  status_download_photo?: "PENDING" | "SUCCESS" | "FAILED";
  gift_share_link?: string | null;
  extra_data?: string | null;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  syncedAt?: Date | null;
  deletedAt?: Date | null;
  gift_variants_id?: number | null;
  variant_combinations?: string | null;
}

export interface GiftCreationAttributes
  extends Optional<
    GiftAttributes,
    | "id"
    | "total_sold"
    | "external_id"
    | "external_url"
    | "rating"
    | "status_download_photo"
    | "gift_share_link"
    | "extra_data"
    | "syncedAt"
    | "deletedAt"
    | "gift_variants_id"
    | "variant_combinations"
  > {}

export class GiftModel
  extends Model<GiftAttributes, GiftCreationAttributes>
  implements GiftAttributes
{
  declare id: number;
  declare shop_id: number;
  declare category_id: number;
  declare sub_category: string;
  declare name: string;
  declare description: string;
  declare price: number;
  declare total_sold: number;
  declare photo: string;
  declare minimum_days: number;
  declare is_available: boolean;
  declare weight: number;
  declare height: number;
  declare width: number;
  declare length: number;
  declare external_id?: string | null;
  declare external_url?: string | null;
  declare rating?: number | null;
  declare status_download_photo?: "PENDING" | "SUCCESS" | "FAILED";
  declare gift_share_link?: string | null;
  declare extra_data?: string | null;
  declare stock: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare syncedAt?: Date | null;
  declare deletedAt?: Date | null;
  declare gift_variants_id?: number | null;
  declare variant_combinations?: string | null;
}

GiftModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    total_sold: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    minimum_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
    },
    external_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    external_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status_download_photo: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
      defaultValue: "PENDING",
      allowNull: true,
    },
    gift_share_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    extra_data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stock: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
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
    syncedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gift_variants_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    variant_combinations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "gift",
    underscored: false,
    indexes: [
      {
        type: "FULLTEXT",
        name: "gift_name_idx",
        fields: ["name"],
      },
    ],
    timestamps: true,
    paranoid: true, // agar pakai deletedAt
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  }
);

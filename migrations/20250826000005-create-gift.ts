import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('gift', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    shop_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'shop',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
      type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
      defaultValue: 'PENDING',
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
  });

  // Add fulltext index for gift name
  await queryInterface.addIndex('gift', ['name'], {
    type: 'FULLTEXT',
    name: 'gift_name_idx',
  });

  // Add other indexes
  await queryInterface.addIndex('gift', ['shop_id']);
  await queryInterface.addIndex('gift', ['category_id']);
  await queryInterface.addIndex('gift', ['external_id']);
  await queryInterface.addIndex('gift', ['is_available']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('gift');
}

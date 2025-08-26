import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('shop_address', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    working_hours: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_open: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    suburb_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    kecamatan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    kelurahan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lat: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lng: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    filter__province_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  // Add index for shop_id
  await queryInterface.addIndex('shop_address', ['shop_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('shop_address');
}

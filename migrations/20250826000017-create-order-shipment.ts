import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order_shipment', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    origin_lat: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    origin_lng: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    origin_postal_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    origin_area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_suburb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dest_lat: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dest_lng: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dest_postal_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    dest_area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dest_suburb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dest_description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Add unique index for order_id
  await queryInterface.addIndex('order_shipment', ['order_id'], {
    unique: true,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order_shipment');
}

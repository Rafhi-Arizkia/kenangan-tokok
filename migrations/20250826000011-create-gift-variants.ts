import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('gift__variants', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    gift_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'gift',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    variant_key1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variant_key2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    variant_value1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    variant_value2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Add index for gift_id
  await queryInterface.addIndex('gift__variants', ['gift_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('gift__variants');
}

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  // Add index for parent_id
  await queryInterface.addIndex('category', ['parent_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('category');
}

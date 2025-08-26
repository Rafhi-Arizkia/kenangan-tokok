import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('gift__specifications__filter_blacklist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('gift__specifications__filter_blacklist');
}

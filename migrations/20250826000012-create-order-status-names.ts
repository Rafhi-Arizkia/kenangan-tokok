import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order_status_names', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    aliases_ind: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'Batal',
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order_status_names');
}

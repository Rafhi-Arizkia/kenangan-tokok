import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('order_status', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status_name_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order_status_names',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  });

  // Add indexes
  await queryInterface.addIndex('order_status', ['order_id']);
  await queryInterface.addIndex('order_status', ['status_name_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('order_status');
}

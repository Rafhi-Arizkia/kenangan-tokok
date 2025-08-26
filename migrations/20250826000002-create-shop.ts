import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('shop', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
  });

  // Add fulltext index for shop name
  await queryInterface.addIndex('shop', ['name'], {
    type: 'FULLTEXT',
    name: 'shop_name_idx',
  });

  // Add index for user_id
  await queryInterface.addIndex('shop', ['user_id']);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('shop');
}

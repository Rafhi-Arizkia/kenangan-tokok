import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // add new columns if they don't already exist
  const table = await queryInterface.describeTable('order_group');

  if (!table['is_gift']) {
    await queryInterface.addColumn('order_group', 'is_gift', {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    });
  }

  if (!table['is_surprise']) {
    await queryInterface.addColumn('order_group', 'is_surprise', {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    });
  }

  if (!table['is_hidden']) {
    await queryInterface.addColumn('order_group', 'is_hidden', {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    });
  }

  if (!table['reference_code']) {
    await queryInterface.addColumn('order_group', 'reference_code', {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    });
  }

  if (!table['payment_gateway_fee']) {
    await queryInterface.addColumn('order_group', 'payment_gateway_fee', {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    });
  }

  if (!table['targeted_receiver_name']) {
    await queryInterface.addColumn('order_group', 'targeted_receiver_name', {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    });
  }

  if (!table['type_device']) {
    await queryInterface.addColumn('order_group', 'type_device', {
      type: DataTypes.ENUM('MOBILE', 'WEB'),
      allowNull: false,
      defaultValue: 'MOBILE',
    });
  }

  if (!table['service_fee']) {
    await queryInterface.addColumn('order_group', 'service_fee', {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    });
  }

  if (!table['message']) {
    await queryInterface.addColumn('order_group', 'message', {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    });
  }

  if (!table['receiver_message']) {
    await queryInterface.addColumn('order_group', 'receiver_message', {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    });
  }

  // alter confirm_gift_by from DATE to BIGINT (if needed) and add FK to user.id
  try {
    const tableAfter = await queryInterface.describeTable('order_group');
    const col = tableAfter['confirm_gift_by'];
    // if column exists and its type doesn't look like bigint, try change
    if (col && !/bigint|int64|number/i.test(String(col.type))) {
      try {
        await queryInterface.changeColumn('order_group', 'confirm_gift_by', {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: null,
        });
      } catch (err) {
        console.warn('changeColumn confirm_gift_by failed, continuing:', err);
      }
    }
  } catch (err) {
    console.warn('Could not inspect order_group table for confirm_gift_by:', err);
  }

  // Add reference constraint for confirm_gift_by if not exists
  try {
    await queryInterface.addConstraint('order_group', {
      fields: ['confirm_gift_by'],
      type: 'foreign key',
      name: 'fk_order_group_confirm_gift_by_user',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  } catch (err) {
    // ignore if already exists or unsupported
  }

  // attempt to add FK constraints for buyer_id and receiver_id
  try {
    await queryInterface.addConstraint('order_group', {
      fields: ['buyer_id'],
      type: 'foreign key',
      name: 'fk_order_group_buyer_id_user',
      references: { table: 'user', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  } catch (err) {
    // ignore
  }

  try {
    await queryInterface.addConstraint('order_group', {
      fields: ['receiver_id'],
      type: 'foreign key',
      name: 'fk_order_group_receiver_id_user',
      references: { table: 'user', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  } catch (err) {
    // ignore
  }

}

export async function down(queryInterface: QueryInterface) {
  // remove added columns
  try {
    const table = await queryInterface.describeTable('order_group');
    if (table['is_gift']) await queryInterface.removeColumn('order_group', 'is_gift');
    if (table['is_surprise']) await queryInterface.removeColumn('order_group', 'is_surprise');
    if (table['is_hidden']) await queryInterface.removeColumn('order_group', 'is_hidden');
    if (table['reference_code']) await queryInterface.removeColumn('order_group', 'reference_code');
    if (table['payment_gateway_fee']) await queryInterface.removeColumn('order_group', 'payment_gateway_fee');
    if (table['targeted_receiver_name']) await queryInterface.removeColumn('order_group', 'targeted_receiver_name');
    if (table['type_device']) await queryInterface.removeColumn('order_group', 'type_device');
    if (table['service_fee']) await queryInterface.removeColumn('order_group', 'service_fee');
    if (table['message']) await queryInterface.removeColumn('order_group', 'message');
    if (table['receiver_message']) await queryInterface.removeColumn('order_group', 'receiver_message');
  } catch (err) {
    // ignore removal errors
  }

  // remove FK constraints if present
  try {
    await queryInterface.removeConstraint('order_group', 'fk_order_group_confirm_gift_by_user');
  } catch (err) {
    // ignore
  }

  try {
    await queryInterface.removeConstraint('order_group', 'fk_order_group_buyer_id_user');
  } catch (err) {
    // ignore
  }

  try {
    await queryInterface.removeConstraint('order_group', 'fk_order_group_receiver_id_user');
  } catch (err) {
    // ignore
  }

  try {
    await queryInterface.changeColumn('order_group', 'confirm_gift_by', {
      type: DataTypes.DATE,
      allowNull: true,
    });
  } catch (err) {
    // ignore
  }
}

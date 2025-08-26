/* eslint-disable @typescript-eslint/no-var-requires */
const TABLE = 'order_group';

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    const desc = await queryInterface.describeTable(TABLE);

    // createdAt
    if (!desc.createdAt) {
      if (desc.created_at) {
        try {
          await queryInterface.renameColumn(TABLE, 'created_at', 'createdAt');
        } catch (err) {
          // best-effort
          // eslint-disable-next-line no-console
          console.warn('rename created_at -> createdAt failed', err.message || err);
        }
      } else {
        try {
          await queryInterface.addColumn(TABLE, 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('add createdAt failed', err.message || err);
        }
      }
    } else {
      try {
        await queryInterface.changeColumn(TABLE, 'createdAt', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('change createdAt failed', err.message || err);
      }
    }

    // updatedAt
    if (!desc.updatedAt) {
      if (desc.updated_at) {
        try {
          await queryInterface.renameColumn(TABLE, 'updated_at', 'updatedAt');
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('rename updated_at -> updatedAt failed', err.message || err);
        }
      } else {
        try {
          await queryInterface.addColumn(TABLE, 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('add updatedAt failed', err.message || err);
        }
      }
    } else {
      try {
        await queryInterface.changeColumn(TABLE, 'updatedAt', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('change updatedAt failed', err.message || err);
      }
    }

    // deletedAt (paranoid)
    if (!desc.deletedAt) {
      if (desc.deleted_at) {
        try {
          await queryInterface.renameColumn(TABLE, 'deleted_at', 'deletedAt');
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('rename deleted_at -> deletedAt failed', err.message || err);
        }
      } else {
        try {
          await queryInterface.addColumn(TABLE, 'deletedAt', {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null,
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('add deletedAt failed', err.message || err);
        }
      }
    } else {
      try {
        await queryInterface.changeColumn(TABLE, 'deletedAt', {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('change deletedAt failed', err.message || err);
      }
    }
  },

  down: async (queryInterface: any, Sequelize: any) => {
    const desc = await queryInterface.describeTable(TABLE);

    // revert createdAt -> created_at
    if (!desc.created_at && desc.createdAt) {
      try {
        await queryInterface.renameColumn(TABLE, 'createdAt', 'created_at');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('rename createdAt -> created_at failed', err.message || err);
      }
    }

    // revert updatedAt -> updated_at
    if (!desc.updated_at && desc.updatedAt) {
      try {
        await queryInterface.renameColumn(TABLE, 'updatedAt', 'updated_at');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('rename updatedAt -> updated_at failed', err.message || err);
      }
    }

    // revert deletedAt -> deleted_at
    if (!desc.deleted_at && desc.deletedAt) {
      try {
        await queryInterface.renameColumn(TABLE, 'deletedAt', 'deleted_at');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('rename deletedAt -> deleted_at failed', err.message || err);
      }
    }
  },
};

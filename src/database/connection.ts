import def, { sequelize } from '../../config/database.config';

// Re-export named and default so other modules import consistently
export { sequelize };
export default def;

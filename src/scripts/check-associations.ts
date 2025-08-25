import { sequelize } from '../models';
import * as models from '../models';

console.log('=== Checking Sequelize Models and Associations ===\n');

// Check if sequelize instance is loaded
console.log('Sequelize instance loaded:', !!sequelize);
console.log('Database name:', sequelize.getDatabaseName());
console.log('Dialect:', sequelize.getDialect());

// List all registered models
console.log('\n=== Registered Models ===');
const modelNames = Object.keys(sequelize.models);
console.log('Total models:', modelNames.length);
console.log('Models:', modelNames.join(', '));

// Check associations for each model
console.log('\n=== Model Associations ===');
for (const modelName of modelNames) {
  const model = sequelize.models[modelName];
  const associations = Object.keys(model.associations);
  
  console.log(`\n${modelName}:`);
  if (associations.length === 0) {
    console.log('  ❌ No associations found');
  } else {
    console.log(`  ✅ ${associations.length} associations:`);
    associations.forEach(assoc => {
      const association = model.associations[assoc];
      console.log(`    - ${assoc}: ${association.associationType} -> ${association.target.name}`);
    });
  }
}

// Check if models are using the same sequelize instance
console.log('\n=== Instance Verification ===');
const modelInstances = new Set();
for (const modelName of modelNames) {
  const model = sequelize.models[modelName];
  modelInstances.add(model.sequelize);
}

if (modelInstances.size === 1) {
  console.log('✅ All models use the same sequelize instance');
} else {
  console.log('❌ Models are using different sequelize instances:', modelInstances.size);
}

console.log('\n=== Summary ===');
console.log(`Models registered: ${modelNames.length}`);
console.log(`Total associations found: ${modelNames.reduce((total, name) => total + Object.keys(sequelize.models[name].associations).length, 0)}`);

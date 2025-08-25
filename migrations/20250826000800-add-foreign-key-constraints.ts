import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Add foreign key constraints
  
  // Gift table foreign keys
  await queryInterface.addConstraint('gift', {
    fields: ['category_id'],
    type: 'foreign key',
    name: 'fk_gift_category',
    references: {
      table: 'category',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  await queryInterface.addConstraint('gift', {
    fields: ['shop_id'],
    type: 'foreign key',
    name: 'fk_gift_shop',
    references: {
      table: 'shop',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Gift Images foreign key
  await queryInterface.addConstraint('gift__images', {
    fields: ['gift_id'],
    type: 'foreign key',
    name: 'fk_gift_images_gift',
    references: {
      table: 'gift',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Gift Reviews foreign key
  await queryInterface.addConstraint('gift__reviews', {
    fields: ['gift_id'],
    type: 'foreign key',
    name: 'fk_gift_reviews_gift',
    references: {
      table: 'gift',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  await queryInterface.addConstraint('gift__reviews', {
    fields: ['order_item_id'],
    type: 'foreign key',
    name: 'fk_gift_reviews_order_item',
    references: {
      table: 'order_item',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  // Gift Review Images foreign key
  await queryInterface.addConstraint('gift__review__images', {
    fields: ['review_id'],
    type: 'foreign key',
    name: 'fk_gift_review_images_review',
    references: {
      table: 'gift__reviews',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Gift Specifications foreign key
  await queryInterface.addConstraint('gift__specifications', {
    fields: ['gift_id'],
    type: 'foreign key',
    name: 'fk_gift_specifications_gift',
    references: {
      table: 'gift',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Gift Variants foreign key
  await queryInterface.addConstraint('gift__variants', {
    fields: ['gift_id'],
    type: 'foreign key',
    name: 'fk_gift_variants_gift',
    references: {
      table: 'gift',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Order foreign key
  await queryInterface.addConstraint('order', {
    fields: ['order_group_id'],
    type: 'foreign key',
    name: 'fk_order_order_group',
    references: {
      table: 'order_group',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  await queryInterface.addConstraint('order', {
    fields: ['shop_id'],
    type: 'foreign key',
    name: 'fk_order_shop',
    references: {
      table: 'shop',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  // Order Item foreign keys
  await queryInterface.addConstraint('order_item', {
    fields: ['order_id'],
    type: 'foreign key',
    name: 'fk_order_item_order',
    references: {
      table: 'order',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  await queryInterface.addConstraint('order_item', {
    fields: ['gift_id'],
    type: 'foreign key',
    name: 'fk_order_item_gift',
    references: {
      table: 'gift',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  // Order Detail foreign key
  await queryInterface.addConstraint('order_detail', {
    fields: ['order_id'],
    type: 'foreign key',
    name: 'fk_order_detail_order',
    references: {
      table: 'order',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Order Shipment foreign key
  await queryInterface.addConstraint('order_shipment', {
    fields: ['order_id'],
    type: 'foreign key',
    name: 'fk_order_shipment_order',
    references: {
      table: 'order',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Order Status foreign keys
  await queryInterface.addConstraint('order_status', {
    fields: ['order_id'],
    type: 'foreign key',
    name: 'fk_order_status_order',
    references: {
      table: 'order',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  await queryInterface.addConstraint('order_status', {
    fields: ['status_id'],
    type: 'foreign key',
    name: 'fk_order_status_status_names',
    references: {
      table: 'order_status_names',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  // Shop Categories foreign keys (junction table)
  await queryInterface.addConstraint('shop_categories', {
    fields: ['shop_id'],
    type: 'foreign key',
    name: 'fk_shop_categories_shop',
    references: {
      table: 'shop',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  await queryInterface.addConstraint('shop_categories', {
    fields: ['category_id'],
    type: 'foreign key',
    name: 'fk_shop_categories_category',
    references: {
      table: 'category',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Category self-referencing foreign key
  await queryInterface.addConstraint('category', {
    fields: ['parent_id'],
    type: 'foreign key',
    name: 'fk_category_parent',
    references: {
      table: 'category',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });
}

export async function down(queryInterface: QueryInterface) {
  // Remove foreign key constraints in reverse order
  
  const constraints = [
    // Category
    'fk_category_parent',
    
    // Shop Categories
    'fk_shop_categories_category',
    'fk_shop_categories_shop',
    
    // Order Status
    'fk_order_status_status_names',
    'fk_order_status_order',
    
    // Order Shipment
    'fk_order_shipment_order',
    
    // Order Detail
    'fk_order_detail_order',
    
    // Order Item
    'fk_order_item_gift',
    'fk_order_item_order',
    
    // Order
    'fk_order_shop',
    'fk_order_order_group',
    
    // Gift Variants
    'fk_gift_variants_gift',
    
    // Gift Specifications
    'fk_gift_specifications_gift',
    
    // Gift Review Images
    'fk_gift_review_images_review',
    
    // Gift Reviews
    'fk_gift_reviews_order_item',
    'fk_gift_reviews_gift',
    
    // Gift Images
    'fk_gift_images_gift',
    
    // Gift
    'fk_gift_shop',
    'fk_gift_category',
  ];

  for (const constraint of constraints) {
    try {
      await queryInterface.removeConstraint('gift', constraint);
    } catch (error) {
      // Ignore if constraint doesn't exist
      console.log(`Constraint ${constraint} not found or already removed`);
    }
  }
}

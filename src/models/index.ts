import sequelize from '../database/connection';

// Export sequelize instance
export { sequelize };

// Import all model classes to initialize them
export { CategoryModel } from './category.model';
export { ShopModel } from './shop.model'; 
export { GiftModel } from './gift.model';
export { GiftImageModel } from './giftImage.model';
export { GiftReviewModel } from './giftReview.model';
export { GiftReviewImageModel } from './giftReviewImage.model';
export { GiftSpecificationModel } from './giftSpecification.model';
export { GiftVariantModel } from './giftVariant.model';
export { OrderGroupModel } from './orderGroup.model';
export { OrderModel } from './order.model';
export { OrderItemModel } from './orderItem.model';
export { OrderDetailModel } from './orderDetail.model';
export { OrderShipmentModel } from './orderShipment.model';
export { OrderStatusModel } from './orderStatus.model';
export { OrderStatusNamesModel } from './orderStatusNames.model';
export { ShopCategoryModel } from './shopCategory.model';

// Import models for associations
import { CategoryModel } from './category.model';
import { ShopModel } from './shop.model';
import { GiftModel } from './gift.model';
import { GiftImageModel } from './giftImage.model';
import { GiftReviewModel } from './giftReview.model';
import { GiftReviewImageModel } from './giftReviewImage.model';
import { GiftSpecificationModel } from './giftSpecification.model';
import { GiftVariantModel } from './giftVariant.model';
import { OrderGroupModel } from './orderGroup.model';
import { OrderModel } from './order.model';
import { OrderItemModel } from './orderItem.model';
import { OrderDetailModel } from './orderDetail.model';
import { OrderShipmentModel } from './orderShipment.model';
import { OrderStatusModel } from './orderStatus.model';
import { OrderStatusNamesModel } from './orderStatusNames.model';
import { ShopCategoryModel } from './shopCategory.model';

// Define associations directly here
const defineAssociations = () => {
  // Category associations
  CategoryModel.hasMany(GiftModel, {
    foreignKey: 'category_id',
    as: 'gifts',
  });

  // Gift associations
  GiftModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id',
    as: 'category',
  });

  GiftModel.hasMany(OrderItemModel, {
    foreignKey: 'gift_id',
    as: 'orderItems',
  });

  // OrderGroup associations
  OrderGroupModel.hasMany(OrderModel, {
    foreignKey: 'order_group_id',
    as: 'orders',
  });

  // Order associations
  OrderModel.belongsTo(OrderGroupModel, {
    foreignKey: 'order_group_id',
    as: 'orderGroup',
  });

  OrderModel.hasMany(OrderItemModel, {
    foreignKey: 'order_id',
    as: 'items',
  });

  OrderModel.hasMany(OrderDetailModel, {
    foreignKey: 'order_id',
    as: 'details',
  });

  OrderModel.hasOne(OrderShipmentModel, {
    foreignKey: 'order_id',
    as: 'shipment',
  });

  OrderModel.hasMany(OrderStatusModel, {
    foreignKey: 'order_id',
    as: 'statuses',
  });

  // OrderItem associations
  OrderItemModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  OrderItemModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  // OrderDetail associations
  OrderDetailModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  // OrderStatus associations
  OrderStatusModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  OrderStatusModel.belongsTo(OrderStatusNamesModel, {
    foreignKey: 'status_id',
    as: 'statusName',
  });

  // OrderShipment associations
  OrderShipmentModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  // GiftImage associations
  GiftImageModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  GiftModel.hasMany(GiftImageModel, {
    foreignKey: 'gift_id',
    as: 'images',
  });

  // GiftReview associations
  GiftReviewModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  GiftModel.hasMany(GiftReviewModel, {
    foreignKey: 'gift_id',
    as: 'reviews',
  });

  GiftReviewModel.hasMany(GiftReviewImageModel, {
    foreignKey: 'review_id',
    as: 'images',
  });

  // GiftReviewImage associations
  GiftReviewImageModel.belongsTo(GiftReviewModel, {
    foreignKey: 'review_id',
    as: 'review',
  });

  // GiftSpecification associations
  GiftSpecificationModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  GiftModel.hasMany(GiftSpecificationModel, {
    foreignKey: 'gift_id',
    as: 'specifications',
  });

  // GiftVariant associations
  GiftVariantModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  GiftModel.hasMany(GiftVariantModel, {
    foreignKey: 'gift_id',
    as: 'variants',
  });

  // Shop associations
  ShopModel.hasMany(GiftModel, {
    foreignKey: 'shop_id',
    as: 'gifts',
  });

  GiftModel.belongsTo(ShopModel, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  ShopModel.hasMany(OrderModel, {
    foreignKey: 'shop_id',
    as: 'orders',
  });

  OrderModel.belongsTo(ShopModel, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  // ShopCategory associations (many-to-many)
  ShopModel.belongsToMany(CategoryModel, {
    through: ShopCategoryModel,
    foreignKey: 'shop_id',
    otherKey: 'category_id',
    as: 'categories',
  });

  CategoryModel.belongsToMany(ShopModel, {
    through: ShopCategoryModel,
    foreignKey: 'category_id',
    otherKey: 'shop_id',
    as: 'shops',
  });

  // ShopCategory direct associations
  ShopCategoryModel.belongsTo(ShopModel, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  ShopCategoryModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id',
    as: 'category',
  });
};

// Initialize associations
defineAssociations();

// Export sequelize instance as default
export default sequelize;

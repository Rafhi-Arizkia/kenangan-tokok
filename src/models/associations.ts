import { CategoryModel } from './category.model';
import { GiftModel } from './gift.model';
import { GiftImageModel } from './giftImage.model';
import { GiftReviewModel } from './giftReview.model';
import { GiftReviewImageModel } from './giftReviewImage.model';
import { GiftSpecificationModel } from './giftSpecification.model';
import { GiftVariantModel } from './giftVariant.model';
import { GiftSpecificationFilterBlacklistModel } from './gifSpesifikFilterBacklist.model';
import { OrderModel } from './order.model';
import { OrderDetailModel } from './orderDetail.model';
import { OrderGroupModel } from './orderGroup.model';
import { OrderItemModel } from './orderItem.model';
import { OrderShipmentModel } from './orderShipment.model';
import { OrderStatusModel } from './orderStatus.model';
import { OrderStatusNamesModel } from './orderStatusNames.model';
import { ShopModel } from './shop.model';
import { ShopAddressModel } from './shopAddress.model';
import { ShopCategoryModel } from './shopCategory.model';

export function defineAssociations() {
  // Category associations
  CategoryModel.hasMany(GiftModel, {
    foreignKey: 'category_id',
    as: 'gifts',
  });
  
  CategoryModel.hasMany(CategoryModel, {
    foreignKey: 'parent_id',
    as: 'children',
  });
  
  CategoryModel.belongsTo(CategoryModel, {
    foreignKey: 'parent_id',
    as: 'parent',
  });

  // Gift associations
  GiftModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id',
    as: 'category',
  });

  GiftModel.belongsTo(ShopModel, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  GiftModel.hasMany(GiftImageModel, {
    foreignKey: 'gift_id',
    as: 'images',
  });

  GiftModel.hasMany(GiftReviewModel, {
    foreignKey: 'gift_id',
    as: 'reviews',
  });

  GiftModel.hasMany(GiftSpecificationModel, {
    foreignKey: 'gift_id',
    as: 'specifications',
  });

  GiftModel.hasMany(GiftVariantModel, {
    foreignKey: 'gift_id',
    as: 'variants',
  });

  GiftModel.hasMany(OrderItemModel, {
    foreignKey: 'gift_id',
    as: 'orderItems',
  });

  // Gift Image associations
  GiftImageModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  // Gift Review associations
  GiftReviewModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  GiftReviewModel.belongsTo(OrderItemModel, {
    foreignKey: 'order_item_id',
    as: 'orderItem',
  });

  GiftReviewModel.hasMany(GiftReviewImageModel, {
    foreignKey: 'review_id',
    as: 'images',
  });

  // Gift Review Image associations
  GiftReviewImageModel.belongsTo(GiftReviewModel, {
    foreignKey: 'review_id',
    as: 'review',
  });

  // Gift Specification associations
  GiftSpecificationModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  // Gift Variant associations
  GiftVariantModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  // Shop associations
  ShopModel.hasMany(GiftModel, {
    foreignKey: 'shop_id',
    as: 'gifts',
  });

  ShopModel.hasMany(OrderModel, {
    foreignKey: 'shop_id',
    as: 'orders',
  });

  ShopModel.hasOne(ShopAddressModel, {
    foreignKey: 'shop_id',
    as: 'address',
  });

  ShopModel.belongsToMany(CategoryModel, {
    through: ShopCategoryModel,
    foreignKey: 'shop_id',
    otherKey: 'category_id',
    as: 'categories',
  });

  // Shop Address associations
  ShopAddressModel.belongsTo(ShopModel, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  // Shop Category associations
  ShopCategoryModel.belongsTo(ShopModel, {
    foreignKey: 'shop_id',
    as: 'shop',
  });

  ShopCategoryModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id',
    as: 'category',
  });

  CategoryModel.belongsToMany(ShopModel, {
    through: ShopCategoryModel,
    foreignKey: 'category_id',
    otherKey: 'shop_id',
    as: 'shops',
  });

  // Order Group associations
  OrderGroupModel.hasMany(OrderModel, {
    foreignKey: 'order_group_id',
    as: 'orders',
  });

  // Order associations
  OrderModel.belongsTo(OrderGroupModel, {
    foreignKey: 'order_group_id',
    as: 'orderGroup',
  });

  OrderModel.belongsTo(ShopModel, {
    foreignKey: 'shop_id',
    as: 'shop',
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

  // Order Item associations
  OrderItemModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  OrderItemModel.belongsTo(GiftModel, {
    foreignKey: 'gift_id',
    as: 'gift',
  });

  OrderItemModel.hasMany(GiftReviewModel, {
    foreignKey: 'order_item_id',
    as: 'reviews',
  });

  // Order Detail associations
  OrderDetailModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  // Order Shipment associations
  OrderShipmentModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  // Order Status associations
  OrderStatusModel.belongsTo(OrderModel, {
    foreignKey: 'order_id',
    as: 'order',
  });

  OrderStatusModel.belongsTo(OrderStatusNamesModel, {
    foreignKey: 'status_name_id',
    as: 'statusName',
  });

  // Order Status Names associations
  OrderStatusNamesModel.hasMany(OrderStatusModel, {
    foreignKey: 'status_name_id',
    as: 'statuses',
  });
}

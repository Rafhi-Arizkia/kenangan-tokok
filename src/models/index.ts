// Import all models to ensure they are initialized
import './category.model';
import './shop.model';
import './shopAddress.model';
import './shopCategory.model';
import './gift.model';
import './giftImage.model';
import './giftReview.model';
import './giftReviewImage.model';
import './giftSpecification.model';
import './giftVariant.model';
import './gifSpesifikFilterBacklist.model';
import './orderGroup.model';
import './order.model';
import './orderItem.model';
import './orderDetail.model';
import './orderShipment.model';
import './orderStatus.model';
import './orderStatusNames.model';

// Models
export { CategoryModel } from './category.model';
export { GiftModel } from './gift.model';
export { GiftImageModel } from './giftImage.model';
export { GiftReviewModel } from './giftReview.model';
export { GiftReviewImageModel } from './giftReviewImage.model';
export { GiftSpecificationModel } from './giftSpecification.model';
export { GiftVariantModel } from './giftVariant.model';
export { GiftSpecificationFilterBlacklistModel } from './gifSpesifikFilterBacklist.model';
export { OrderModel } from './order.model';
export { OrderDetailModel } from './orderDetail.model';
export { OrderGroupModel } from './orderGroup.model';
export { OrderItemModel } from './orderItem.model';
export { OrderShipmentModel } from './orderShipment.model';
export { OrderStatusModel } from './orderStatus.model';
export { OrderStatusNamesModel } from './orderStatusNames.model';
export { ShopModel } from './shop.model';
export { ShopAddressModel } from './shopAddress.model';
export { ShopCategoryModel } from './shopCategory.model';

// Define associations
export { defineAssociations } from './associations';

export interface GiftDTO {
  id: number;
  shop_id: number;
  category_id: number;
  sub_category?: string;
  name: string;
  description?: string;
  price: number;
  total_sold?: number;
  photo?: string;
  minimum_days?: number;
  is_available?: boolean;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  external_id?: string | null;
  external_url?: string | null;
  rating?: number | null;
  status_download_photo?: 'PENDING' | 'SUCCESS' | 'FAILED';
  gift_share_link?: string | null;
  extra_data?: string | null;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGiftDTO {
  shop_id: number;
  category_id: number;
  sub_category?: string;
  name: string;
  description?: string;
  price: number;
  total_sold?: number;
  photo?: string;
  minimum_days?: number;
  is_available?: boolean;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  stock?: number;
}

export interface UpdateGiftDTO {
  category_id?: number;
  sub_category?: string;
  name?: string;
  description?: string;
  price?: number;
  photo?: string;
  minimum_days?: number;
  is_available?: boolean;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  stock?: number;
}

export interface GiftQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  shop_id?: number;
  category_id?: number;
  is_available?: boolean;
  min_price?: number;
  max_price?: number;
  sort_by?: 'name' | 'price' | 'createdAt' | 'rating' | 'total_sold';
  sort_order?: 'ASC' | 'DESC';
}

export interface GiftImageDTO {
  id: string;
  gift_id: number;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGiftImageDTO {
  gift_id: number;
  url: string;
}

export interface GiftReviewDTO {
  id: string;
  gift_id: number;
  user_id?: number;
  order_item_id?: number;
  display_name?: string;
  message: string;
  rating: number;
  external_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGiftReviewDTO {
  gift_id: number;
  order_item_id?: number;
  user_id?: number;
  display_name?: string;
  message: string;
  rating: number;
  external_id?: string;
}

export interface GiftSpecificationDTO {
  id: string;
  gift_id: number;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGiftSpecificationDTO {
  gift_id: number;
  key: string;
  value: string;
}

export interface GiftVariantDTO {
  id: number;
  gift_id?: number;
  variant_name: string;
  variant_value: string;
  price_adjustment?: number;
  stock?: number;
  sku?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGiftVariantDTO {
  gift_id?: number;
  variant_name: string;
  variant_value: string;
  price_adjustment?: number;
  stock?: number;
  sku?: string;
}

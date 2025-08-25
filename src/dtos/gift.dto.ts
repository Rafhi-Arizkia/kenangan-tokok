export interface GiftDTO {
  id: number;
  shop_id: number;
  category_id?: number;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  weight?: number;
  stock?: number;
  min_order?: number;
  max_order?: number;
  is_active: boolean;
  is_featured: boolean;
  sku?: string;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
  rating?: number;
  total_reviews?: number;
  total_sold?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGiftDTO {
  shop_id: number;
  category_id?: number;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  weight?: number;
  stock?: number;
  min_order?: number;
  max_order?: number;
  sku?: string;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
  is_active?: boolean;
  is_featured?: boolean;
}

export interface UpdateGiftDTO {
  category_id?: number;
  name?: string;
  description?: string;
  price?: number;
  discount_price?: number;
  weight?: number;
  stock?: number;
  min_order?: number;
  max_order?: number;
  is_active?: boolean;
  is_featured?: boolean;
  sku?: string;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface GiftQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  shop_id?: number;
  category_id?: number;
  is_active?: boolean;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
  sort_by?: 'name' | 'price' | 'created_at' | 'rating' | 'total_sold';
  sort_order?: 'ASC' | 'DESC';
}

export interface GiftImageDTO {
  id: string;
  gift_id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGiftImageDTO {
  gift_id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order?: number;
}

export interface GiftReviewDTO {
  id: string;
  gift_id: number;
  order_item_id?: number;
  user_id?: number;
  rating: number;
  review_text?: string;
  is_verified: boolean;
  is_approved: boolean;
  helpful_count?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGiftReviewDTO {
  gift_id: number;
  order_item_id?: number;
  user_id?: number;
  rating: number;
  review_text?: string;
  is_verified?: boolean;
  is_approved?: boolean;
}

export interface GiftSpecificationDTO {
  id: string;
  gift_id: number;
  name: string;
  value: string;
  unit?: string;
  sort_order?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGiftSpecificationDTO {
  gift_id: number;
  name: string;
  value: string;
  unit?: string;
  sort_order?: number;
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

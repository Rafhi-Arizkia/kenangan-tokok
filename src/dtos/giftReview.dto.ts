export interface CreateGiftReviewDTO {
  gift_id: number;
  user_id?: number;
  order_item_id?: number;
  display_name?: string;
  message: string;
  rating: number;
  external_id?: string;
}

export interface UpdateGiftReviewDTO {
  display_name?: string;
  message?: string;
  rating?: number;
}

export interface GiftReviewQueryDTO {
  gift_id?: number;
  user_id?: number;
  rating?: number;
  page?: number;
  limit?: number;
}

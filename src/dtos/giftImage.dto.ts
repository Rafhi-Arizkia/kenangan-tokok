export interface CreateGiftImageDTO {
  gift_id: number;
  url: string;
}

export interface UpdateGiftImageDTO {
  url?: string;
}

export interface GiftImageQueryDTO {
  gift_id?: number;
  page?: number;
  limit?: number;
}

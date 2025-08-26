export interface CreateGiftSpecificationDTO {
  gift_id: number;
  key: string;
  value: string;
}

export interface UpdateGiftSpecificationDTO {
  key?: string;
  value?: string;
}

export interface GiftSpecificationQueryDTO {
  gift_id?: number;
  key?: string;
  page?: number;
  limit?: number;
}

export interface CreateGiftVariantDTO {
  gift_id?: number;
  variant_key1: string;
  variant_key2?: string;
  variant_value1: string;
  variant_value2?: string;
}

export interface UpdateGiftVariantDTO {
  variant_key1?: string;
  variant_key2?: string;
  variant_value1?: string;
  variant_value2?: string;
}

export interface GiftVariantQueryDTO {
  gift_id?: number;
  variant_key1?: string;
  variant_key2?: string;
  page?: number;
  limit?: number;
}

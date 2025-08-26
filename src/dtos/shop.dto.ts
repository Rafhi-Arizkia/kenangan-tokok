export interface ShopDTO {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  display_address?: string;
  photo?: string;
  phone?: string;
  contact?: string;
  fee_percent?: number;
  bank_type?: string;
  bank_number?: string;
  bank_name?: string;
  use_shipper?: boolean;
  is_can_claim?: number;
  is_claimed?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShopDTO {
  user_id: number;
  name: string;
  description?: string;
  display_address?: string;
  photo?: string;
  phone?: string;
  contact?: string;
  fee_percent?: number;
  bank_type?: string;
  bank_number?: string;
  bank_name?: string;
  use_shipper?: boolean;
}

export interface UpdateShopDTO {
  name?: string;
  description?: string;
  display_address?: string;
  photo?: string;
  phone?: string;
  contact?: string;
  fee_percent?: number;
  bank_type?: string;
  bank_number?: string;
  bank_name?: string;
  use_shipper?: boolean;
}

export interface ShopQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  province?: string;
}

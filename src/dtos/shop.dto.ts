export interface ShopDTO {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  is_active: boolean;
  is_verified: boolean;
  rating?: number;
  total_products?: number;
  total_orders?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateShopDTO {
  user_id: number;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

export interface UpdateShopDTO {
  name?: string;
  description?: string;
  logo?: string;
  banner?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  is_active?: boolean;
}

export interface ShopQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  is_verified?: boolean;
  city?: string;
  province?: string;
}

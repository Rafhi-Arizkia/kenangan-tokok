export interface CreateShopAddressDTO {
  shop_id: number;
  working_hours?: string;
  is_open?: boolean;
  address?: string;
  address_description?: string;
  area_id?: number;
  suburb_id?: number;
  postal_code?: string;
  city?: string;
  kecamatan?: string;
  kelurahan?: string;
  lat?: string;
  lng?: string;
  filter__province_id?: number;
}

export interface UpdateShopAddressDTO {
  working_hours?: string;
  is_open?: boolean;
  address?: string;
  address_description?: string;
  area_id?: number;
  suburb_id?: number;
  postal_code?: string;
  city?: string;
  kecamatan?: string;
  kelurahan?: string;
  lat?: string;
  lng?: string;
  filter__province_id?: number;
}

export interface ShopAddressQueryDTO {
  shop_id?: number;
  city?: string;
  is_open?: boolean;
  page?: number;
  limit?: number;
}

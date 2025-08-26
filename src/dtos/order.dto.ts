// dto/order-request.dto.ts

export interface CreateOrderDTO {
  receiver_id: number;
  buyer_id: number;
  is_gift: 0 | 1;
  is_hidden: 0 | 1;
  is_surprise: 0 | 1;
  orders: SingleOrderDTO[];
}

export interface SingleOrderDTO {
  receiver: {
    name: string | null;
    phoneNo: string | null;
  };
  shopId: number;
  dateOrderedFor: string; // ISO date string, e.g. "2023-06-14"
  package: {
    type: number; // e.g. 3
    items: PackageItemDTO[];
  };
  shipment: ShipmentDTO;
}

export interface PackageItemDTO {
  id: number;      // product/gift ID
  qty: number;     // quantity
  note: string | null;
}

export interface ShipmentDTO {
  rateId: number;
  useInsurance: boolean;
  method: string;
  logisticName: string;
  minDay: number;
  maxDay: number;
  price: number;
  dest: ShipmentDestinationDTO;
}

export interface ShipmentDestinationDTO {
  address: string | null;
  lat: string | null;
  lng: string | null;
  areaId: string | null;
  description: string | null;
  suburb_id: string | null;
}

export interface UpdateOrderDTO {
  invoice_url?: string;
  shipper_id?: string;
  awb?: string;
  pickup_code?: string;
  confirmation_deadline?: Date;
  date_ordered_for?: Date;
}

export interface OrderQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  order_group_id?: number;
  shop_id?: number;
  order_status?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: "created_at" | "grand_total" | "order_status";
  sort_order?: "ASC" | "DESC";
}

export interface OrderGroupDTO {
  id: number;
  receiver_id?: number;
  is_gift: number;
  is_surprise: number;
  is_hidden: number;
  reference_code: string;
  payment_gateway_fee: number;
  targeted_receiver_name?: string;
  type_device: 'MOBILE' | 'WEB';
  service_fee: number;
  message?: string;
  receiver_message?: string;
  payment_status?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOrderGroupDTO {
  receiver_id?: number;
  is_gift?: 0 | 1;
  is_hidden?: 0 | 1;
  is_surprise?: 0 | 1;
  orders: SingleOrderDTO[];
}

export interface OrderItemDTO {
  id: number;
  order_id: string;
  gift_id?: number;
  gift_name?: string;
  gift_price: number;
  quantity: number;
  total_price: number;
  discount_amount?: number;
  notes?: string;
  variant_info?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOrderItemDTO {
  order_id: string;
  name: string;
  price: number;
  vendor_fee?: number;
  qty: number;
  note?: string;
  photo: string;
  gift_id: number;
}

export interface OrderDetailDTO {
  id: number;
  order_id?: string;
  shop_id?: number;
  detail_type?: string;
  detail_value?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderShipmentDTO {
  id: number;
  order_id: string;
  courier_name?: string;
  tracking_number?: string;
  shipping_cost?: number;
  estimated_delivery?: Date;
  actual_delivery?: Date;
  shipment_status: string;
  shipping_address?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOrderShipmentDTO {
  order_id: string;
  receiver_name: string;
  receiver_phone: string;
  sender_name: string;
  sender_phone: string;
  origin_lat: string;
  origin_lng: string;
  origin_address: string;
  origin_description?: string;
  origin_area: number;
  dest_lat: string;
  dest_lng: string;
  dest_address: string;
  dest_description?: string;
  dest_area: number;
  rate_id: number;
  use_insurance: boolean;
  package_heigth: number;
  package_length: number;
  package_type: number;
  package_price: string;
  package_weight: number;
  package_width: number;
  delivery_logistic_name: string;
  delivery_method: string;
  delivery_min_day: number;
  delivery_max_day: number;
  delivery_price: number;
}

export interface UpdateOrderShipmentDTO {
  receiver_name?: string;
  receiver_phone?: string;
  sender_name?: string;
  sender_phone?: string;
  origin_lat?: string;
  origin_lng?: string;
  origin_address?: string;
  origin_description?: string;
  origin_area?: number;
  dest_lat?: string;
  dest_lng?: string;
  dest_address?: string;
  dest_description?: string;
  dest_area?: number;
  rate_id?: number;
  use_insurance?: boolean;
  package_heigth?: number;
  package_length?: number;
  package_type?: number;
  package_price?: string;
  package_weight?: number;
  package_width?: number;
  delivery_logistic_name?: string;
  delivery_method?: string;
  delivery_min_day?: number;
  delivery_max_day?: number;
  delivery_price?: number;
}

export interface OrderStatusDTO {
  id: number;
  order_id: string;
  status_id?: number;
  status_name?: string;
  notes?: string;
  changed_by?: number;
  created_at: Date;
  updated_at: Date;
}

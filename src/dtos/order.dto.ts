export interface OrderDTO {
  id: string;
  order_group_id: number;
  shop_id?: number;
  order_number?: string;
  order_status: string;
  total_amount: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOrderDTO {
  id: string;
  order_group_id: number;
  shop_id?: number;
  order_number?: string;
  order_status?: string;
  total_amount: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  notes?: string;
}

export interface UpdateOrderDTO {
  order_status?: string;
  total_amount?: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total?: number;
  notes?: string;
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
  sort_by?: 'created_at' | 'grand_total' | 'order_status';
  sort_order?: 'ASC' | 'DESC';
}

export interface OrderGroupDTO {
  id: number;
  receiver_id?: number;
  sender_name?: string;
  sender_phone?: string;
  sender_email?: string;
  receiver_name?: string;
  receiver_phone?: string;
  receiver_email?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_province?: string;
  shipping_postal_code?: string;
  total_amount: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  payment_method?: string;
  payment_status: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOrderGroupDTO {
  receiver_id?: number;
  sender_name?: string;
  sender_phone?: string;
  sender_email?: string;
  receiver_name?: string;
  receiver_phone?: string;
  receiver_email?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_province?: string;
  shipping_postal_code?: string;
  total_amount: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  payment_method?: string;
  payment_status?: string;
  notes?: string;
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
  gift_id?: number;
  gift_name?: string;
  gift_price: number;
  quantity: number;
  total_price: number;
  discount_amount?: number;
  notes?: string;
  variant_info?: string;
}

export interface OrderDetailDTO {
  id: number;
  order_id?: string;
  shop_id?: number;
  wallet_id?: number;
  cartItem_id?: number;
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
  courier_name?: string;
  tracking_number?: string;
  shipping_cost?: number;
  estimated_delivery?: Date;
  shipment_status: string;
  shipping_address?: string;
  notes?: string;
}

export interface UpdateOrderShipmentDTO {
  courier_name?: string;
  tracking_number?: string;
  shipping_cost?: number;
  estimated_delivery?: Date;
  actual_delivery?: Date;
  shipment_status?: string;
  shipping_address?: string;
  notes?: string;
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

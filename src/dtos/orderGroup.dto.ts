export interface CreateOrderGroupDTO {
  buyer_id: number;
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
  subtotal: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total: number;
  payment_method?: string;
  notes?: string;
  targeted_receiver_name?: string;
  message?: string;
  receiver_message?: string;
  confirm_gift_by?: Date;
}

export interface UpdateOrderGroupDTO {
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
  subtotal?: number;
  total_discount?: number;
  shipping_cost?: number;
  tax_amount?: number;
  grand_total?: number;
  payment_method?: string;
  notes?: string;
  targeted_receiver_name?: string;
  message?: string;
  receiver_message?: string;
  confirm_gift_by?: Date;
}

export interface OrderGroupQueryDTO {
  buyer_id?: number;
  receiver_id?: number;
  payment_method?: string;
  shipping_city?: string;
  page?: number;
  limit?: number;
}

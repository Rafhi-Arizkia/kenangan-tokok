export interface CreateOrderGroupDTO {
  buyer_id: number;
  receiver_id?: number;
  is_gift?: boolean | number;
  is_surprise?: boolean | number;
  is_hidden?: boolean | number;
  reference_code?: string;
  payment_gateway_fee?: number;
  targeted_receiver_name?: string;
  type_device?: 'MOBILE' | 'WEB';
  service_fee?: number;
  message?: string;
  receiver_message?: string;
  // user id who confirmed the gift when confirmation is done without the app
  confirm_gift_by?: number;
}

export interface UpdateOrderGroupDTO {
  receiver_id?: number;
  is_gift?: boolean | number;
  is_surprise?: boolean | number;
  is_hidden?: boolean | number;
  reference_code?: string;
  payment_gateway_fee?: number;
  targeted_receiver_name?: string;
  type_device?: 'MOBILE' | 'WEB';
  service_fee?: number;
  message?: string;
  receiver_message?: string;
  confirm_gift_by?: number;
}

export interface OrderGroupQueryDTO {
  buyer_id?: number;
  receiver_id?: number;
  payment_method?: string;
  shipping_city?: string;
  page?: number;
  limit?: number;
}

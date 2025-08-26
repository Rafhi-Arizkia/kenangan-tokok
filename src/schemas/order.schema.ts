import { FastifySchema } from 'fastify';
import { 
  successResponseSchema, 
  errorResponseSchema, 
  paginationSchema 
} from './common.schema';

// Base Order Schema
export const orderSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Order unique identifier' },
    invoice_url: { type: 'string', description: 'Invoice URL' },
    shipper_id: { type: 'string', description: 'Shipper ID' },
    awb: { type: 'string', description: 'Air Waybill number' },
    pickup_code: { type: 'string', description: 'Pickup code' },
    confirmation_deadline: { type: 'string', format: 'date-time', description: 'Confirmation deadline' },
    date_ordered_for: { type: 'string', format: 'date-time', description: 'Date ordered for' },
    shop_id: { type: 'string', description: 'Shop ID' },
    order_group_id: { type: 'integer', description: 'Order group ID' },
  },
};

// Order Group Schema
export const orderGroupSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Order group unique identifier' },
    receiver_id: { type: 'integer', description: 'Receiver user ID' },
    sender_name: { type: 'string', description: 'Sender name' },
    sender_phone: { type: 'string', description: 'Sender phone number' },
    sender_email: { type: 'string', format: 'email', description: 'Sender email' },
    receiver_name: { type: 'string', description: 'Receiver name' },
    receiver_phone: { type: 'string', description: 'Receiver phone number' },
    receiver_email: { type: 'string', format: 'email', description: 'Receiver email' },
    shipping_address: { type: 'string', description: 'Shipping address' },
    shipping_city: { type: 'string', description: 'Shipping city' },
    shipping_province: { type: 'string', description: 'Shipping province' },
    shipping_postal_code: { type: 'string', description: 'Shipping postal code' },
    total_amount: { type: 'number', minimum: 0, description: 'Total amount before discounts' },
    total_discount: { type: 'number', minimum: 0, description: 'Total discount amount' },
    shipping_cost: { type: 'number', minimum: 0, description: 'Shipping cost' },
    tax_amount: { type: 'number', minimum: 0, description: 'Tax amount' },
    grand_total: { type: 'number', minimum: 0, description: 'Final total amount' },
    payment_method: { type: 'string', description: 'Payment method used' },
    payment_status: { type: 'string', description: 'Payment status' },
    notes: { type: 'string', description: 'Order group notes' },
  created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
  updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  },
};

// Order Item Schema
export const orderItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Order item unique identifier' },
    name: { type: 'string', description: 'Item name' },
    price: { type: 'number', minimum: 0, description: 'Item price' },
    vendor_fee: { type: 'number', minimum: 0, description: 'Vendor fee' },
    qty: { type: 'integer', minimum: 1, description: 'Quantity' },
    note: { type: 'string', description: 'Item note' },
    photo: { type: 'string', description: 'Item photo URL' },
    order_id: { type: 'string', description: 'Associated order ID' },
    gift_id: { type: 'integer', description: 'Associated gift ID' },
  },
};

// Order Shipment Schema
export const orderShipmentSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Shipment unique identifier' },
    receiver_name: { type: 'string', description: 'Receiver name' },
    receiver_phone: { type: 'string', description: 'Receiver phone' },
    sender_name: { type: 'string', description: 'Sender name' },
    sender_phone: { type: 'string', description: 'Sender phone' },
    origin_lat: { type: 'string', description: 'Origin latitude' },
    origin_lng: { type: 'string', description: 'Origin longitude' },
    origin_address: { type: 'string', description: 'Origin address' },
    origin_description: { type: 'string', description: 'Origin description' },
    origin_area: { type: 'integer', description: 'Origin area ID' },
    dest_lat: { type: 'string', description: 'Destination latitude' },
    dest_lng: { type: 'string', description: 'Destination longitude' },
    dest_address: { type: 'string', description: 'Destination address' },
    dest_description: { type: 'string', description: 'Destination description' },
    dest_area: { type: 'integer', description: 'Destination area ID' },
    rate_id: { type: 'integer', description: 'Rate ID' },
    use_insurance: { type: 'boolean', description: 'Use insurance' },
    package_heigth: { type: 'number', description: 'Package height' },
    package_length: { type: 'number', description: 'Package length' },
    package_type: { type: 'integer', description: 'Package type' },
    package_price: { type: 'string', description: 'Package price' },
    package_weight: { type: 'number', description: 'Package weight' },
    package_width: { type: 'number', description: 'Package width' },
    order_id: { type: 'string', description: 'Associated order ID' },
    delivery_logistic_name: { type: 'string', description: 'Delivery logistic name' },
    delivery_method: { type: 'string', description: 'Delivery method' },
    delivery_min_day: { type: 'integer', description: 'Delivery minimum days' },
    delivery_max_day: { type: 'integer', description: 'Delivery maximum days' },
    delivery_price: { type: 'number', description: 'Delivery price' },
  createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
  updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  deletedAt: { type: 'string', format: 'date-time', description: 'Deletion timestamp' },
  },
};

// GET /orders - Get all orders
export const getAllOrdersSchema = {
  summary: 'Get all orders with pagination and filtering',
  description: 'Retrieve a paginated list of orders with optional filtering',
  tags: ['Order'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      search: { type: 'string', description: 'Search term for order number' },
      order_group_id: { type: 'integer', description: 'Filter by order group ID' },
      shop_id: { type: 'integer', description: 'Filter by shop ID' },
      order_status: { type: 'string', description: 'Filter by order status' },
      date_from: { type: 'string', format: 'date', description: 'Filter from date (YYYY-MM-DD)' },
      date_to: { type: 'string', format: 'date', description: 'Filter to date (YYYY-MM-DD)' },
      sort_by: { 
        type: 'string', 
        enum: ['created_at', 'grand_total', 'order_status'], 
        default: 'created_at',
        description: 'Sort field' 
      },
      sort_order: { 
        type: 'string', 
        enum: ['ASC', 'DESC'], 
        default: 'DESC',
        description: 'Sort order' 
      },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'object',
          properties: {
            orders: {
              type: 'array',
              items: orderSchema,
            },
            pagination: paginationSchema,
          },
        },
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /orders/:id - Get order by ID
export const getOrderByIdSchema = {
  summary: 'Get order by ID',
  description: 'Retrieve a single order by its unique identifier',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Order ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderSchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /orders - Create new order
export const createOrderSchema = {
  tags: ['Order'],
  body: {
    type: 'object',
    required: ['buyer_id', 'orders'],
    properties: {
      receiver_id: { type: 'integer', description: 'Receiver ID' },
      buyer_id: { type: 'integer', description: 'Buyer ID' },
      is_gift: { type: 'integer', enum: [0, 1], description: 'Is gift flag' },
      is_hidden: { type: 'integer', enum: [0, 1], description: 'Is hidden flag' },
      is_surprise: { type: 'integer', enum: [0, 1], description: 'Is surprise flag' },
      orders: {
        type: 'array',
        items: {
          type: 'object',
          required: ['shopId', 'dateOrderedFor', 'package', 'shipment', 'receiver'],
          properties: {
            receiver: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                phoneNo: { type: 'string' }
              }
            },
            shopId: { type: 'integer', description: 'Shop ID' },
            dateOrderedFor: { type: 'string', format: 'date', description: 'Date ordered for' },
            package: {
              type: 'object',
              required: ['type', 'items'],
              properties: {
                type: { type: 'integer', description: 'Package type' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['id', 'qty'],
                    properties: {
                      id: { type: 'integer', description: 'Product/Gift ID' },
                      qty: { type: 'integer', minimum: 1, description: 'Quantity' },
                      note: { type: 'string', description: 'Item note' }
                    }
                  }
                }
              }
            },
            shipment: {
              type: 'object',
              required: ['rateId', 'useInsurance', 'method', 'logisticName', 'minDay', 'maxDay', 'price', 'dest'],
              properties: {
                rateId: { type: 'integer', description: 'Rate ID' },
                useInsurance: { type: 'boolean', description: 'Use insurance' },
                method: { type: 'string', description: 'Shipping method' },
                logisticName: { type: 'string', description: 'Logistic name' },
                minDay: { type: 'integer', description: 'Minimum delivery days' },
                maxDay: { type: 'integer', description: 'Maximum delivery days' },
                price: { type: 'number', description: 'Shipping price' },
                dest: {
                  type: 'object',
                  required: ['address'],
                  properties: {
                    address: { type: 'string', description: 'Destination address' },
                    lat: { type: 'string', description: 'Latitude' },
                    lng: { type: 'string', description: 'Longitude' },
                    areaId: { type: 'string', description: 'Area ID' },
                    description: { type: 'string', description: 'Address description' },
                    suburb_id: { type: 'string', description: 'Suburb ID' }
                  }
                }
              }
            }
          }
        }
      }
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            errors: { type: 'array' },
            orderGroup: { type: 'object' },
            orders: { type: 'array' },
            response: { type: 'array' }
          }
        },
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PUT /orders/:id - Update order
export const updateOrderSchema = {
  summary: 'Update order',
  description: 'Update an existing order',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Order ID' },
    },
  },
  body: {
    type: 'object',
    properties: {
      order_status: { 
        type: 'string', 
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        description: 'Order status' 
      },
      total_amount: { type: 'number', minimum: 0, description: 'Total order amount before discounts' },
      total_discount: { type: 'number', minimum: 0, description: 'Total discount amount' },
      shipping_cost: { type: 'number', minimum: 0, description: 'Shipping cost' },
      tax_amount: { type: 'number', minimum: 0, description: 'Tax amount' },
      grand_total: { type: 'number', minimum: 0, description: 'Final total amount' },
      notes: { type: 'string', maxLength: 500, description: 'Order notes' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderSchema,
      },
    },
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE /orders/:id - Delete order
export const deleteOrderSchema = {
  summary: 'Delete order',
  description: 'Delete an order from the system',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Order ID' },
    },
  },
  response: {
    200: successResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /orders/shop/:shopId - Get orders by shop ID
export const getOrdersByShopIdSchema = {
  summary: 'Get orders by shop ID',
  description: 'Retrieve all orders for a specific shop',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['shopId'],
    properties: {
      shopId: { type: 'integer', description: 'Shop ID' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      order_status: { type: 'string', description: 'Filter by order status' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'object',
          properties: {
            orders: {
              type: 'array',
              items: orderSchema,
            },
            pagination: paginationSchema,
          },
        },
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /orders/groups - Create order group
export const createOrderGroupSchema = {
  summary: 'Create order group',
  description: 'Create a new order group for multiple orders',
  tags: ['Order'],
  body: {
    type: 'object',
    required: ['total_amount', 'grand_total', 'payment_status'],
    properties: {
      receiver_id: { type: 'integer', description: 'Receiver user ID' },
      sender_name: { type: 'string', maxLength: 255, description: 'Sender name' },
      sender_phone: { type: 'string', pattern: '^[+]?[0-9\\-\\s\\(\\)]+$', description: 'Sender phone' },
      sender_email: { type: 'string', format: 'email', description: 'Sender email' },
      receiver_name: { type: 'string', maxLength: 255, description: 'Receiver name' },
      receiver_phone: { type: 'string', pattern: '^[+]?[0-9\\-\\s\\(\\)]+$', description: 'Receiver phone' },
      receiver_email: { type: 'string', format: 'email', description: 'Receiver email' },
      shipping_address: { type: 'string', maxLength: 500, description: 'Shipping address' },
      shipping_city: { type: 'string', maxLength: 100, description: 'Shipping city' },
      shipping_province: { type: 'string', maxLength: 100, description: 'Shipping province' },
      shipping_postal_code: { type: 'string', pattern: '^[0-9]{5}$', description: 'Postal code' },
      total_amount: { type: 'number', minimum: 0, description: 'Total amount before discounts' },
      total_discount: { type: 'number', minimum: 0, default: 0, description: 'Total discount amount' },
      shipping_cost: { type: 'number', minimum: 0, default: 0, description: 'Shipping cost' },
      tax_amount: { type: 'number', minimum: 0, default: 0, description: 'Tax amount' },
      grand_total: { type: 'number', minimum: 0, description: 'Final total amount' },
      payment_method: { 
        type: 'string',
        enum: ['credit_card', 'bank_transfer', 'e_wallet', 'cash_on_delivery'],
        description: 'Payment method' 
      },
      payment_status: { 
        type: 'string',
        enum: ['pending', 'paid', 'failed', 'refunded'],
        description: 'Payment status' 
      },
      notes: { type: 'string', maxLength: 500, description: 'Order group notes' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderGroupSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /orders/groups/:id - Get order group by ID
export const getOrderGroupByIdSchema = {
  summary: 'Get order group by ID',
  description: 'Retrieve an order group with all its orders',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Order group ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderGroupSchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /orders/items - Add order item
export const addOrderItemSchema = {
  summary: 'Add order item',
  description: 'Add an item to an existing order',
  tags: ['Order'],
  body: {
    type: 'object',
    required: ['order_id', 'gift_price', 'quantity', 'total_price'],
    properties: {
      order_id: { type: 'string', description: 'Associated order ID' },
      gift_id: { type: 'integer', description: 'Associated gift ID' },
      gift_name: { type: 'string', maxLength: 255, description: 'Gift name at time of order' },
      gift_price: { type: 'number', minimum: 0, description: 'Gift price at time of order' },
      quantity: { type: 'integer', minimum: 1, description: 'Quantity ordered' },
      total_price: { type: 'number', minimum: 0, description: 'Total price for this item' },
      discount_amount: { type: 'number', minimum: 0, default: 0, description: 'Discount amount' },
      notes: { type: 'string', maxLength: 255, description: 'Item-specific notes' },
      variant_info: { type: 'string', maxLength: 255, description: 'Product variant info' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderItemSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /orders/:orderId/items - Get order items
export const getOrderItemsSchema = {
  summary: 'Get order items',
  description: 'Retrieve all items for a specific order',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['orderId'],
    properties: {
      orderId: { type: 'string', description: 'Order ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'array',
          items: orderItemSchema,
        },
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /orders/shipments - Create order shipment
export const createOrderShipmentSchema = {
  summary: 'Create order shipment',
  description: 'Create shipment information for an order',
  tags: ['Order'],
  body: {
    type: 'object',
    required: ['order_id', 'shipment_status'],
    properties: {
      order_id: { type: 'string', description: 'Associated order ID' },
      courier_name: { type: 'string', maxLength: 100, description: 'Courier company name' },
      tracking_number: { type: 'string', maxLength: 100, description: 'Package tracking number' },
      shipping_cost: { type: 'number', minimum: 0, description: 'Shipping cost' },
      estimated_delivery: { type: 'string', format: 'date-time', description: 'Estimated delivery date' },
      shipment_status: { 
        type: 'string',
        enum: ['pending', 'picked_up', 'in_transit', 'delivered', 'failed'],
        description: 'Shipment status' 
      },
      shipping_address: { type: 'string', maxLength: 500, description: 'Shipping address' },
      notes: { type: 'string', maxLength: 500, description: 'Shipment notes' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderShipmentSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PUT /orders/shipments/:id - Update order shipment
export const updateOrderShipmentSchema = {
  summary: 'Update order shipment',
  description: 'Update shipment information',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Shipment ID' },
    },
  },
  body: {
    type: 'object',
    properties: {
      courier_name: { type: 'string', maxLength: 100, description: 'Courier company name' },
      tracking_number: { type: 'string', maxLength: 100, description: 'Package tracking number' },
      shipping_cost: { type: 'number', minimum: 0, description: 'Shipping cost' },
      estimated_delivery: { type: 'string', format: 'date-time', description: 'Estimated delivery date' },
      actual_delivery: { type: 'string', format: 'date-time', description: 'Actual delivery date' },
      shipment_status: { 
        type: 'string',
        enum: ['pending', 'picked_up', 'in_transit', 'delivered', 'failed'],
        description: 'Shipment status' 
      },
      shipping_address: { type: 'string', maxLength: 500, description: 'Shipping address' },
      notes: { type: 'string', maxLength: 500, description: 'Shipment notes' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderShipmentSchema,
      },
    },
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /orders/:orderId/shipment - Get order shipment
export const getOrderShipmentSchema = {
  summary: 'Get order shipment',
  description: 'Retrieve shipment information for an order',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['orderId'],
    properties: {
      orderId: { type: 'string', description: 'Order ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderShipmentSchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PUT /orders/:orderId/status - Update order status
export const updateOrderStatusSchema = {
  summary: 'Update order status',
  description: 'Update the status of an order',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['orderId'],
    properties: {
      orderId: { type: 'string', description: 'Order ID' },
    },
  },
  body: {
    type: 'object',
    required: ['status'],
    properties: {
      status: { 
        type: 'string',
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        description: 'New order status' 
      },
      notes: { type: 'string', maxLength: 500, description: 'Status change notes' },
      changed_by: { type: 'integer', description: 'User ID who made the change' },
    },
  },
  response: {
    200: successResponseSchema,
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /orders/:orderId/statuses - Get order status history
export const getOrderStatusesSchema  = {
  summary: 'Get order status history',
  description: 'Retrieve the complete status history for an order',
  tags: ['Order'],
  params: {
    type: 'object',
    required: ['orderId'],
    properties: {
      orderId: { type: 'string', description: 'Order ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer', description: 'Status record ID' },
              order_id: { type: 'string', description: 'Associated order ID' },
              status_id: { type: 'integer', description: 'Status ID' },
              status_name: { type: 'string', description: 'Status name' },
              notes: { type: 'string', description: 'Status change notes' },
              changed_by: { type: 'integer', description: 'User who made the change' },
              created_at: { type: 'string', format: 'date-time', description: 'Status change timestamp' },
            },
          },
        },
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

export const getAllShopAddressesSchema = {
  description: 'Get all shop addresses with optional filtering and pagination',
  tags: ['Shop Address'],
  querystring: {
    type: 'object',
    properties: {
      shop_id: { type: 'number', description: 'Filter by shop ID' },
      city: { type: 'string', description: 'Filter by city name' },
      is_open: { type: 'boolean', description: 'Filter by open status' },
      page: { type: 'number', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'number', minimum: 1, maximum: 100, default: 10, description: 'Items per page' }
    },
    additionalProperties: true
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              shop_id: { type: 'number' },
              working_hours: { type: ['string', 'null'] },
              is_open: { type: 'boolean' },
              address: { type: ['string', 'null'] },
              address_description: { type: ['string', 'null'] },
              city: { type: ['string', 'null'] },
              shop: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' }
                }
              }
            }
          }
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' }
          }
        },
        timestamp: { type: 'string' }
      }
    }
  }
};

export const getShopAddressByIdSchema = {
  description: 'Get shop address by ID',
  tags: ['Shop Address'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Shop address ID' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            shop_id: { type: 'number' },
            working_hours: { type: ['string', 'null'] },
            is_open: { type: 'boolean' },
            address: { type: ['string', 'null'] },
            address_description: { type: ['string', 'null'] },
            city: { type: ['string', 'null'] },
            shop: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' }
              }
            }
          }
        },
        timestamp: { type: 'string' }
      }
    },
    404: {
      description: 'Shop address not found',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        timestamp: { type: 'string' }
      }
    }
  }
};

export const getShopAddressByShopIdSchema = {
  description: 'Get shop address by shop ID',
  tags: ['Shop Address'],
  params: {
    type: 'object',
    required: ['shopId'],
    properties: {
      shopId: { type: 'string', description: 'Shop ID' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            shop_id: { type: 'number' },
            working_hours: { type: ['string', 'null'] },
            is_open: { type: 'boolean' },
            address: { type: ['string', 'null'] },
            address_description: { type: ['string', 'null'] },
            city: { type: ['string', 'null'] }
          }
        },
        timestamp: { type: 'string' }
      }
    }
  }
};

export const createShopAddressSchema = {
  description: 'Create new shop address',
  tags: ['Shop Address'],
  body: {
    type: 'object',
    required: ['shop_id'],
    properties: {
      shop_id: { type: 'number' },
      working_hours: { type: 'string' },
      is_open: { type: 'boolean', default: false },
      address: { type: 'string' },
      address_description: { type: 'string' },
      area_id: { type: 'number' },
      suburb_id: { type: 'number' },
      postal_code: { type: 'string' },
      city: { type: 'string' },
      kecamatan: { type: 'string' },
      kelurahan: { type: 'string' },
      lat: { type: 'string' },
      lng: { type: 'string' },
      filter__province_id: { type: 'number' }
    }
  },
  response: {
    201: {
      description: 'Shop address created successfully',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            shop_id: { type: 'number' },
            working_hours: { type: ['string', 'null'] },
            is_open: { type: 'boolean' },
            address: { type: ['string', 'null'] }
          }
        },
        timestamp: { type: 'string' }
      }
    }
  }
};

export const updateShopAddressSchema = {
  description: 'Update shop address',
  tags: ['Shop Address'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Shop address ID' }
    }
  },
  body: {
    type: 'object',
    properties: {
      working_hours: { type: 'string' },
      is_open: { type: 'boolean' },
      address: { type: 'string' },
      address_description: { type: 'string' },
      area_id: { type: 'number' },
      suburb_id: { type: 'number' },
      postal_code: { type: 'string' },
      city: { type: 'string' },
      kecamatan: { type: 'string' },
      kelurahan: { type: 'string' },
      lat: { type: 'string' },
      lng: { type: 'string' },
      filter__province_id: { type: 'number' }
    }
  },
  response: {
    200: {
      description: 'Shop address updated successfully',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        timestamp: { type: 'string' }
      }
    }
  }
};

export const deleteShopAddressSchema = {
  description: 'Delete shop address',
  tags: ['Shop Address'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Shop address ID' }
    }
  },
  response: {
    200: {
      description: 'Shop address deleted successfully',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        timestamp: { type: 'string' }
      }
    }
  }
};

# API Schemas Documentation

This folder contains comprehensive Fastify schemas for all API endpoints, ensuring automatic Swagger/OpenAPI documentation generation and request/response validation.

## Overview

The schemas are organized into separate modules for better maintainability:

- `common.schema.ts` - Shared schemas and utilities
- `system.schema.ts` - System/health check endpoints
- `category.schema.ts` - Category management endpoints
- `gift.schema.ts` - Gift/Product management endpoints
- `shop.schema.ts` - Shop management endpoints
- `order.schema.ts` - Order management endpoints

## Features

Each schema provides:

✅ **Complete request validation**: params, querystring, body  
✅ **Response schemas**: success and error responses  
✅ **Swagger/OpenAPI documentation**: automatic generation  
✅ **Type safety**: TypeScript interfaces  
✅ **Validation rules**: min/max lengths, formats, enums  
✅ **Descriptive documentation**: for each field and endpoint  

## Usage

### Basic Route with Schema

```typescript
import { getAllGiftsSchema } from '../../schemas/gift.schema';

fastify.get('/gifts', {
  schema: getAllGiftsSchema,
}, async (request, reply) => {
  // Handler implementation
});
```

### Schema Structure

Each endpoint schema includes:

```typescript
export const exampleSchema: FastifySchema = {
  summary: 'Brief description',
  description: 'Detailed description',
  tags: ['Category'], // For Swagger grouping
  params: {
    // URL parameters validation
  },
  querystring: {
    // Query parameters validation
  },
  body: {
    // Request body validation
  },
  response: {
    200: { /* success response */ },
    400: { /* validation error */ },
    404: { /* not found */ },
    500: { /* server error */ },
  },
};
```

## Validation Features

### Field Validation
- **String lengths**: `minLength`, `maxLength`
- **Number ranges**: `minimum`, `maximum`
- **Formats**: `email`, `uri`, `date-time`, `date`
- **Patterns**: Regular expressions for validation
- **Enums**: Predefined value lists

### Common Patterns
- **Pagination**: `page`, `limit` with defaults
- **Search**: Text search with length limits
- **Sorting**: `sort_by`, `sort_order` with enums
- **Filters**: Boolean and value-based filtering

## Swagger/OpenAPI Integration

The schemas automatically generate:

- **Interactive API documentation** at `/swagger`
- **Scalar documentation** at `/scalar`
- **OpenAPI JSON spec** at `/swagger/json`

### Tags Organization
- `System` - Health check and status
- `Category` - Product categories
- `Shop` - Shop management
- `Gift` - Product/gift management
- `Order` - Order processing

## Response Standards

All endpoints follow consistent response patterns:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* actual data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": { /* additional error info */ }
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": {
    "items": [ /* array of items */ ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## Common Schema Utilities

The `common.schema.ts` provides reusable components:

### Response Schemas
- `successResponseSchema`
- `errorResponseSchema`
- `paginatedResponseSchema(itemSchema)`

### Query Parameters
- `paginationQuerySchema`
- `searchQuerySchema`
- `sortQuerySchema`

### Field Types
- `timestampSchema`
- `phoneSchema`
- `emailSchema`
- `urlSchema`
- `postalCodeSchema`
- `ratingSchema`
- `currencySchema`

### Parameter Schemas
- `idParamSchema` (integer ID)
- `stringIdParamSchema` (string ID)

## Status Enums

Predefined status values:

```typescript
orderStatusEnum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
paymentStatusEnum: ['pending', 'paid', 'failed', 'refunded', 'partial_refund']
shipmentStatusEnum: ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned']
paymentMethodEnum: ['credit_card', 'debit_card', 'bank_transfer', 'e_wallet', 'cash_on_delivery', 'installment']
```

## Best Practices

1. **Always use schemas**: Every route should have a schema
2. **Descriptive names**: Use clear, consistent naming
3. **Proper validation**: Set appropriate constraints
4. **Error handling**: Include all possible error responses
5. **Documentation**: Add descriptions for complex fields
6. **Consistency**: Follow established patterns

## Adding New Schemas

1. Create schema file: `src/schemas/newmodule.schema.ts`
2. Import common utilities: `import { ... } from './common.schema'`
3. Define base entity schema
4. Create endpoint schemas with full validation
5. Export all schemas
6. Add to `index.ts`: `export * from './newmodule.schema'`
7. Use in routes with `schema: yourSchema`

## Environment Setup

Ensure API documentation is enabled:

```env
API_DOCS_ENABLED=true
```

Access documentation at:
- Swagger UI: `http://localhost:3000/swagger`
- Scalar UI: `http://localhost:3000/scalar`
- OpenAPI JSON: `http://localhost:3000/swagger/json`

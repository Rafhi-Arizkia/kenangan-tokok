# Kenangan Commerce Backend

A complete commerce backend API built with Fastify, TypeScript, and Sequelize ORM for MySQL database.

## Features

- **Framework**: Fastify (Node.js) with TypeScript
- **ORM**: Sequelize with MySQL
- **Architecture**: MVC + DTO pattern
- **Database**: MySQL (based on kenangan_dev schema)
- **Models**: Complete commerce domain models including Shop, Gift, Order management

## Project Structure

```
src/
├── controllers/          # Route handlers
│   ├── shop.controller.ts
│   ├── gift.controller.ts
│   └── order.controller.ts
├── services/            # Business logic layer
│   ├── shop.service.ts
│   ├── gift.service.ts
│   └── order.service.ts
├── models/              # Sequelize models
│   ├── shop.model.ts
│   ├── category.model.ts
│   ├── gift.model.ts
│   ├── giftImage.model.ts
│   ├── giftReview.model.ts
│   ├── giftReviewImage.model.ts
│   ├── giftSpecification.model.ts
│   ├── giftVariant.model.ts
│   ├── order.model.ts
│   ├── orderGroup.model.ts
│   ├── orderItem.model.ts
│   ├── orderDetail.model.ts
│   ├── orderShipment.model.ts
│   ├── orderStatus.model.ts
│   ├── orderStatusNames.model.ts
│   └── index.ts
├── routes/              # Route definitions
│   ├── shop.routes.ts
│   ├── gift.routes.ts
│   └── order.routes.ts
├── dtos/               # Data Transfer Objects
│   ├── shop.dto.ts
│   ├── gift.dto.ts
│   └── order.dto.ts
├── utils/              # Utility functions
│   └── response.ts
├── migrations/         # Database migrations
└── server.ts          # Main server file
```

## Database Models

### Shop Management
- **shop**: Shop/store information
- **category**: Product categories

### Gift/Product Management  
- **gift**: Main product/gift table
- **gift__images**: Product images
- **gift__reviews**: Product reviews
- **gift__review__images**: Review images
- **gift__specifications**: Product specifications
- **gift__variants**: Product variants

### Order Management
- **order_group**: Order group (cart/transaction level)
- **order**: Individual shop orders within a group
- **order_item**: Items in an order
- **order_detail**: Additional order details
- **order_shipment**: Shipping information
- **order_status**: Order status history
- **order_status_names**: Status name definitions

## API Endpoints

### Shop Routes (`/api/shops`)
- `GET /` - Get all shops (with pagination & filtering)
- `GET /:id` - Get shop by ID
- `POST /` - Create new shop
- `PUT /:id` - Update shop
- `DELETE /:id` - Delete shop
- `GET /user/:userId` - Get shops by user ID

### Gift Routes (`/api/gifts`)
- `GET /` - Get all gifts (with pagination & filtering)
- `GET /:id` - Get gift by ID
- `POST /` - Create new gift
- `PUT /:id` - Update gift
- `DELETE /:id` - Delete gift
- `GET /shop/:shopId` - Get gifts by shop ID
- `POST /images` - Add gift image
- `POST /reviews` - Add gift review
- `GET /:id/reviews` - Get gift reviews
- `POST /specifications` - Add gift specification

### Order Routes (`/api/orders`)
- `GET /` - Get all orders (with pagination & filtering)
- `GET /:id` - Get order by ID
- `POST /` - Create new order
- `PUT /:id` - Update order
- `DELETE /:id` - Delete order
- `GET /shop/:shopId` - Get orders by shop ID
- `POST /groups` - Create order group
- `GET /groups/:id` - Get order group by ID
- `POST /items` - Add order item
- `GET /:orderId/items` - Get order items
- `POST /shipments` - Create order shipment
- `PUT /shipments/:id` - Update order shipment
- `GET /:orderId/shipment` - Get order shipment
- `PUT /:orderId/status` - Update order status
- `GET /:orderId/statuses` - Get order status history

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure database**:
   - Update `config/config.json` with your MySQL credentials
   - Database name should be `kenangan_dev` (or update accordingly)

3. **Run migrations** (if available):
   ```bash
   npm run db:migrate
   ```

## Usage

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Database Commands
```bash
# Create database
npm run db:create

# Run migrations
npm run db:migrate

# Run seeds
npm run db:seed
```

## Response Format

All API responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error info",
  "code": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Configuration

- **Server Port**: 3000 (configurable via environment)
- **Database**: MySQL (configured in `config/config.json`)
- **Environment**: Development/Test/Production configs available

## Features

- ✅ Complete MVC architecture
- ✅ TypeScript support
- ✅ Sequelize ORM with MySQL
- ✅ Comprehensive model relationships
- ✅ Pagination and filtering
- ✅ Error handling
- ✅ CORS and Helmet security
- ✅ Structured response format
- ✅ DTO pattern for data validation
- ✅ Dot notation file naming

## Health Check

Visit `http://localhost:3000/health` to check if the server is running.

## License

ISC
# kenangan-tokok

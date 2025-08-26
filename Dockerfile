### Stage 1: build
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production=false

# Copy source
COPY . .

# Build
RUN npm run build

### Stage 2: runtime
FROM node:22-alpine AS runtime
WORKDIR /app

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm ci --production

# Copy built files
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "dist/server.js"]

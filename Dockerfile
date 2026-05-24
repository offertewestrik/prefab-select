# Stage 1: Build the client assets and compile the server
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package file configuration
COPY package*.json ./

# Install all development and build dependencies
RUN npm ci

# Copy the source code in
COPY . .

# Build the front-end SPA and compile the TypeScript Express server
RUN npm run build

# Stage 2: Production runtime image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install ONLY production dependencies to keep the image slim
COPY package*.json ./
RUN npm ci --only=production

# Copy the compiled production outputs from builder (including SPA assets and compiled backend file)
COPY --from=builder /app/dist ./dist

# Expose the default port (Cloud Run will inject its own PORT at runtime)
EXPOSE 3000

# Start the certified full-stack server
CMD ["npm", "start"]

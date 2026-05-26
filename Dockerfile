# Stage 1: Build the client assets and compile the server
FROM node:18-slim AS builder

WORKDIR /app

# Ensure devDependencies are installed even if NODE_ENV is set to production in CI environment
ENV NODE_ENV=development

# Copy package file configuration
COPY package*.json ./

# Install all development and build dependencies
RUN npm install

# Copy the source code in
COPY . .

# Build the front-end SPA and compile the TypeScript Express server
RUN npm run build

# Stage 2: Production runtime image
FROM node:18-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install ONLY production dependencies to keep the image slim
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled production outputs from builder (including SPA assets and compiled backend file)
COPY --from=builder /app/dist ./dist

# Expose the default port (Cloud Run will inject its own PORT at runtime)
EXPOSE 3000

# Start the certified full-stack server
CMD ["npm", "start"]

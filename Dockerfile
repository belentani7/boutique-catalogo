# Boutique Catálogo - Multi-stage Dockerfile
# Optimized for Vite + React production build

# === Build Stage ===
FROM node:20-alpine AS builder

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat \
    git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit --no-fund

# Copy source code
COPY . .

# Build application
ENV VITE_APP_VERSION=1.0.0
RUN npm run build

# === Runtime Stage ===
FROM node:20-alpine AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 vite

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder --chown=vite:nodejs /app/dist ./dist
COPY --from=builder --chown=vite:nodejs /app/public ./public

# Install serve for static file serving
RUN npm install -g serve

# Switch to non-root user
USER vite

# Expose port
EXPOSE 3001

# Environment variables
ENV NODE_ENV=production \
    PORT=3001 \
    HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001 || exit 1

# Run server
CMD ["serve", "-s", "dist", "-l", "3001"]
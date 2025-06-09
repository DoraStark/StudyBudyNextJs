# 1. App build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy of dependencies file and packet installing
COPY package*.json ./
RUN npm install

# Copy of the whole project
COPY . .

# App build
RUN npm run build

# 2. Launch container
FROM node:18-alpine AS runner
WORKDIR /app

# Copy of necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]

# Production image
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies (production only)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy all files
COPY . .

# Use a minimal runtime image
FROM node:18-alpine AS runtime
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
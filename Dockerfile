FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --only=production

COPY . .

# Build the TypeScript code
CMD ["npm", "run", "build"]

# Use a minimal runtime image for production
FROM node:18-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/db ./db

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]

#commands to build and run the docker image
# docker build -t myapp .
# docker run -p 3000:3000 myapp
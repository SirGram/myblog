# Use a lightweight Node.js image for the backend
FROM node:22.2.0-slim AS base

LABEL fly_launch_runtime="NestJS"
WORKDIR /backend

# Copy package.json and package-lock.json explicitly
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy backend source code
COPY . . 

# Build the backend
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start:prod"]

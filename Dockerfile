# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.2.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NestJS"

# Build frontend
WORKDIR /frontend
COPY frontend-user/package*.json ./
RUN npm ci
COPY frontend-user .

# Set environment variables for the frontend build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN echo "VITE_API_URL=${VITE_API_URL}" > .env.production
RUN npm run build

# Build backend
WORKDIR /app
ENV NODE_ENV="production"

FROM base as build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY backend/package-lock.json backend/package.json ./
RUN npm ci --include=dev

COPY backend .

RUN npm run build

# Copy frontend build to backend public directory
RUN mkdir -p dist/public
COPY --from=0 /frontend/dist ./dist/public

FROM base

COPY --from=build /app /app

ENV NODE_ENV production

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]

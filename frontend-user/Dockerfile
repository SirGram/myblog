# Use a lightweight Node.js image for building the frontend
FROM node:22.2.0-slim AS build

WORKDIR /frontend
# Copy package.json and package-lock.json explicitly
COPY package.json package-lock.json ./
RUN npm ci
COPY . . 

RUN npm run build

# Use a lightweight web server like Nginx to serve the built frontend
FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

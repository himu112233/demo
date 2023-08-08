# Stage 1: Build Angular app
FROM node:16-alpine as angular
WORKDIR /app
COPY . .

RUN npm install --force
RUN npm run build

# Stage 2: Serve the built Angular app using Apache HTTP Server
FROM httpd:2.4-alpine
COPY --from=angular /app/dist/Back-office /usr/local/apache2/htdocs/

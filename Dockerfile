# Stage 1: Build the Angular app
FROM node:14.17.0 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the built Angular app using Nginx
FROM nginx:1.21.1
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
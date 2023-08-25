# Use an official Node.js runtime as the base image
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Build the Angular application
RUN npm  build

# Use a smaller base image for the production environment
FROM nginx:alpine

# Copy the build output from the "build" stage to the nginx directory
COPY --from=build /app/dist/Back-office /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]

# Step 1: Build the React app using Node.js
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application
COPY ./ ./

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app using Nginx (for production)
FROM nginx:alpine

# Copy the built frontend app from the build stage to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Command to run Nginx (default is already correct)
CMD ["nginx", "-g", "daemon off;"]

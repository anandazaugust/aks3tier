# Use official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present) from the backend directory
COPY ./backend/package.json ./backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application code (from the backend directory)
COPY ./backend ./

# Expose the port the app will run on (port 5000 as specified in your server.js)
EXPOSE 80

# Command to run the application
CMD ["node", "server.js"]

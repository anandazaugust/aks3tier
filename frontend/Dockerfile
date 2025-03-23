# Dockerfile for frontend
FROM node:14 AS build
WORKDIR /app

# Accept an argument for the API URL
# ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
# Copy the rest of the application files, including public/ and src/
COPY ./frontend/public ./public
COPY ./frontend/public/src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

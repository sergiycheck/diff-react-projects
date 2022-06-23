# syntax=docker/dockerfile:1
FROM node:latest AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN  pwd && cd src && ls && npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
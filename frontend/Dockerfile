FROM node:16-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.23.1-alpine AS backend
WORKDIR /app
COPY --from=base /app/build /usr/share/nginx/html
COPY nginx /etc
# EXPOSE ${PORT}
EXPOSE 80
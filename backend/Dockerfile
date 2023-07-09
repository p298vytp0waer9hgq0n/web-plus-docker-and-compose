FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json /.
RUN npm i
COPY . .
RUN npm run build

FROM node:18-alpine AS backend
WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev
COPY --from=base /app/dist ./dist
COPY ecosystem.config.js ./
RUN npm i -g pm2
EXPOSE ${PORT}
ENTRYPOINT pm2-runtime dist/main.js
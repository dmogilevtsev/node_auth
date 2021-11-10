FROM node:12.22.7-alpine as builder
WORKDIR /usr
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node:12.22.7-alpine
WORKDIR /usr
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/dist ./dist

CMD node dist/index.js
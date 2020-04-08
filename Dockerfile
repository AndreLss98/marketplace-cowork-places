From node:lts AS builder

WORKDIR /app

COPY . .

RUN npm i && npm run build-prod
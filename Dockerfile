FROM node:lts AS node
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/place-et /usr/share/nginx/html
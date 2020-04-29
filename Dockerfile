FROM node:lts AS node
WORKDIR /app
COPY ./dist /app/dist
# RUN npm i
# RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/place-et /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
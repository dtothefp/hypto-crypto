FROM node:8.9.4

MAINTAINER dtothefp

RUN mkdir -p /usr/src/app

COPY ./client /usr/src/app
WORKDIR /usr/src/app

RUN yarn install

ENV NODE_ENV=production

RUN npm start

# docker.nginx
FROM nginx:alpine

# forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/dist /www/data

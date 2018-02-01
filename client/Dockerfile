FROM node:8.9.4

MAINTAINER dtothefp

ARG TRAVIS_BRANCH
RUN mkdir -p /usr/src/app
RUN apt-get update && apt-get install -y git

COPY ./client /usr/src/app
WORKDIR /usr/src/app

RUN yarn install

ENV NODE_ENV=production

RUN yarn build
RUN if [ "$TRAVIS_BRANCH" = "gh-pages" ]; then ./deploy.sh; fi

# docker.nginx
FROM nginx:alpine

# forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/dist /www/data

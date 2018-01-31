FROM node:8.9.4

MAINTAINER dtothefp

RUN mkdir -p /usr/src/app
COPY ./server /usr/src/app
WORKDIR /usr/src/app

RUN yarn install

ENV NODE_ENV=production

EXPOSE 80

ENTRYPOINT ["npm", "start"]

# syntax=docker/dockerfile:1

FROM node:12.18.1

ENV NODE_ENV=production

ENV host=database

ENV user=postgres

ENV password=postgres

ENV REDIS_HOST=cache

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c" , "npm run migrate && npm start"]
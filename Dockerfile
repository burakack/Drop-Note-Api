# syntax=docker/dockerfile:1

FROM node:12.18.1

ENV NODE_ENV=production

COPY . ./app

WORKDIR /app

RUN npm install

ENTRYPOINT ["/bin/sh", "-c" , "npm run migrate && npm start"]
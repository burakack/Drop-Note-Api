# syntax=docker/dockerfile:1

FROM node:12.18.1

ENV NODE_ENV=production

ENV PORT=3000

ENV DB_USER=postgres

ENV database=drop_note_database

ENV DB_PASSWORD=postgres

ENV password=postgres

ENV host=database

ENV user=postgres

ENV password=postgres

ENV REDIS_HOST=cache

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c" , "npm run migrate && npm run seed && npm start"]
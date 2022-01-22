# FROM node:16-alpine3.14
FROM node:16-alpine3.14 AS base
WORKDIR /usr/app

COPY package*.json ./

# RUN npm install && node ace build --production
RUN npm install --no-optional --production && npm cache clean --force

COPY . .


FROM base as production

ENV NODE_PATH=./build

USER node

RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]

# RUN npm run build
CMD [ "npm", "run", "build"]

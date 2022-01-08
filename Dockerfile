# FROM node:16-alpine3.14
FROM node:16-alpine3.14 AS base
WORKDIR /usr/app

COPY package*.json ./

# RUN npm install && node ace build --production
RUN npm install --no-optional --production && npm cache clean --force

COPY . .


FROM base as production

ENV NODE_PATH=./build

RUN npm run build
# FROM node:16-alpine3.14

# COPY --from=build /usr/app/build /build


# RUN npm install --production
# RUN apk update && apk add nodejs && apk add --update nodejs npm

# RUN npm install --no-optional && npm cache clean --force

# RUN npm install

# COPY . .

# ARG request_domain

# ENV request_domain=$request_domain

# EXPOSE 4000

# CMD [ "npm", "run", "start:fast" ]
# CMD [ "npm", "run", "server" ]
# CMD [ "npm", "run", "start:watch"]
# CMD node build/server.ts
# CMD [ "npm", "run", "dev"]

# FROM node:16-alpine3.14
FROM alpine
WORKDIR /usr/app

COPY package*.json ./

RUN apk add nodejs

# RUN apk update && apk add nodejs && apk add --update nodejs npm

# RUN npm install --production
RUN apk update && apk add nodejs && apk add --update nodejs npm

RUN npm install --no-optional && npm cache clean --force

# RUN npm install

COPY . .

ARG request_domain

# # ENV PORT=4000
ENV request_domain=$request_domain

EXPOSE 4000

# CMD [ "npm", "run", "start:fast" ]
# CMD [ "npm", "run", "server" ]
# CMD [ "npm", "run", "start:watch"]
CMD [ "npm", "run", "dev"]

FROM node:16.13.1-alpine3.14
# FROM node:12.20.0-alpine3.9

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ARG request_domain

# ENV PORT=4000
ENV request_domain=$request_domain

EXPOSE 4000

CMD [ "npm", "run", "start:fast" ]
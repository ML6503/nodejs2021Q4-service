FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ARG request_domain

# ENV PORT=4000
ENV request_domain=$request_domain

EXPOSE 4000

# CMD [ "npm", "run", "start:fast" ]

CMD [ "npm", "run", "build", "&& nodemon", "dist/server.js" ]
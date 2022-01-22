# RS School REST service

## 

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/ML6503/nodejs2021Q4-service.git
```

## Choose postgresql project branch

git checkout postgresql

```

```

## Installing NPM modules

npm install

or

npm ci

```

```

## DOCKER usage

## Prerequisites

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Create `Docker Hub` account [Docker Hub](https://hub.docker.com/)

## DOCKER commands

# Deploy with docker-compose:

docker-compose up --build

server is now running

## Other Docker commands

# Check containers are running:

docker ps

# Check all containers:

docker ps -a

# Delete single container:

docker container rm [container id]

# Stop the containers running:

docker-compose down

# To stop running containers and remove all volumes declaired and attached:

docker-compose down -v

# To remove all stopped contaners, all unused networks, all images & build cache

docker system prune -a

# Get into internal terminal of a single container:

docker exec -i -t [container tag] bash

# on Windows

docker exec -i -t [container tag] //bin/sh

# Check all images:

docker images

# Scan single image for vulnerabilities:

docker scan [OPTIONS] IMAGE

# Delete single image:

docker rmi [OPTIONS] IMAGE [IMAGE...]

# Push an image or a repository to a registry:

# 1. to create tag to link image to user repo

docker tag <id> <user>/<image>:<optional tag>

# 2. push command

docker push [OPTIONS] NAME[:TAG]

# Pull an image or a repository from a registry

docker pull [OPTIONS] NAME[:TAG|@DIGEST]

# Pull server image for present project

docker pull arethel/trello-clone:server

# Pull postgress db image for present project

docker pull arethel/trello-clone:postgressDB

https://hub.docker.com/r/arethel/trello-clone/tags

```

```

## Running application

```

npm start

```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

```

```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## HTTP requests testing

After application running open test.http file
choose or create new requests and send them from the file
(VSCode REST Client extension or similar is required)

```

```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```

npm run lint

```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

```

```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Simple Trello Clone server-side application.</p>

## Description

Project for RS School Node JS course

## Installation

```bash
$ git clone https://github.com/ML6503/nodejs2021Q4-service.git

$ git checkout -b nestJs

$ npm install

or

$ npm ci
```

## Running the app

```bash

# in Docker
$ npm run docker:up
```

## Test

```bash

$ npm run test:auth

```

## Load testing reports by Artillery

## Express

# Summary report

```
Summary
Test duration	200 sec
Virtual Users created	1801
Virtual Users completed	566

Scenario counts
CRUD operations with user	1801 (100%)

more details in artillery/reports/express/artillery-users-test.json.html
```

## Fastify

# Summary report

```
Summary
Test duration	200 sec
Virtual Users created	1813
Virtual Users completed	443

Scenario counts
CRUD operations with user	1813 (100%)

more details in artillery/reports/fastify/artillery-users-test.json.html

```

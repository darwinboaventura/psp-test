# PSP Test

## Requirements

- Docker
- Docker Compose
- Yarn

## How to run the server

- Clone [this](https://github.com/darwinboaventura/psp-test) project
- Run `yarn`
- Run `docker-compose up -d --force-recreate psp_server && docker-compose logs -f psp_server`

## How to run the tests

- Clone [this](https://github.com/darwinboaventura/psp-test) project
- Run `yarn`
- Run `docker-compose up -d --force-recreate psp_server_test && docker-compose logs -f psp_server_test`

## Stack

- NestJS
- MySQL
- TypeORM
- Docker
- Typescript

## Ports

| Service               | Port   | Host                       | Status |
|-----------------------|--------|----------------------------|--------|
| Application           | `9020` | http://localhost:9020      | active |
| Application Docs      | `9020` | http://localhost:9020/docs | active |
| Database (MySQL)      | `9021` | http://localhost:9021      | active |

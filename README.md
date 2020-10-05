# CRUD Order Management

## Description

A simple order management system that is built with Nest.js. It's a place to practice adding Docker, Github Actions, automated testing, deployment ... into your project.

You can easily swap Nest.js with other backend technologies such as Java, Golang, Rust (maybe) ... for learning purpose.

## Things to improve

- [ ] Optimize query to get number of products for daily report
- [ ] Optimize query to get most sales product for daily report
- [ ] Test coverage
- [ ] DTO validation (before saving into database)
- [ ] Validate API request parameters

## Quick start

If you want to quickly run this project on localhost, run these commands:

```bash
$ npm install
$ npm run build # to generate Swagger documetation, see the section below
$ cp .env.example .env
$ cp docker.env.example docker.env
$ docker-compose up -d
```

It will start PostgreSQL, Redis and the Nest.js app at the same time.

Then, the API is ready at http://localhost:3000

## Development

In case you want to change some codes, you can use the `docker-compose.dev.yml` to start only PostgreSQL and Redis.

After that, you run the Nest.js app separately using `npm run start:dev` (for hot reloading) or `npm run start`

### Installation

```bash
$ npm install
```

### Generate the Swagger API Documentation

```bash
$ npm run build
```

After that, the API documentation will be available at http://localhost:3000/swagger

I use Nest.js CLI to generate the API documentation automatically.

For more information, you can check this section: https://docs.nestjs.com/openapi/cli-plugin

### Create Env Files
```bash
$ cp .env.development.example .env
$ cp docker.env.example docker.env
```

### Run the app

```bash
# Boot up PostgreSQL and Redis
$ docker-compose up -f docker-compose.dev.yml

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Hoang Trinh](https://hoangtrinhj.com)
- Twitter - [@hoangtrinhj](https://twitter.com/hoangtrinhj)

## License

[MIT licensed](LICENSE).

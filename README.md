# nodejs-test

## About
This repository contains code that manages basic CRUD functionality for posts.

## Setup without docker
Follow the steps below to get started with local development:
  * Clone the [repo](https://github.com/sameernair1993/nodejs-test.git)
  * Run `npm i` or `npm install` to install the necessary packages.
  * Ensure that you have the environment variables listed in the `.env.example` file.
  * Run `npm run start:dev` to run the local server in watch mode or `npm start` without a watcher.

## Setup with docker
If docker is your preferred method of running on local:
  * Install [docker](https://docs.docker.com/engine/install/) for your operating system.
  * Perform step 1 from the above.
  * Get the necessary environment variables from your team.
  * Run `docker-compose build` to build the docker image
  * Run `docker-compose up -d` to run the container in the background or `docker-compose up` for foreground mode

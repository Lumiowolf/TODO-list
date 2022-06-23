## Description

Backend for TODO-list application

## Installation

```bash
$ npm install
```

For application to work you must setup PostreSQL database.
Once it's done you have to fill src/common/envs/.env file with corresponing values describing connection to your database. Those are:
* host name
* port number
* username
* password
* database name

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
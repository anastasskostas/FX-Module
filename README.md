# FX Purchase Module

Application will allow foreign currency purchase.
It is running here: [http://35.234.147.101:3000/#/home](http://35.234.147.101:3000/#/home).

with 2 endpoints:

`GET - /transactions` -> Get history order by date

`POST - /purchase` -> Buy currency using GBP

## Technologies
**UI**: Frontend is developed with React & React-Bootstrap

**API**: Backend is developed with NodeJS

**Storage**: Redis is used for caching data

**Deployment**: Google Cloud - Docker implementation

## Running locally

### UI - steps
##### `cd ui`
##### `npm install`
##### `npm run start:dev` for integrating with api from localhost
##### `npm run start:prod` for integrating with api from server

### API - steps
##### `cd api`
##### `npm install`
##### `npm run start:dev` for connecting Redis locally
##### `npm run start:prod` for connecting Redis on server

NOTE: in case you run api locally, you need to `Run "redis-server" locally`.

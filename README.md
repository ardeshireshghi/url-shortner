# url-shortner

Simple Node micro-service for shortening URLs.

## Usage

Use Node >= 16.

### Installation

```
$ yarn
$ cp .env{.example,}
```

### Run normally

`yarn start`

### Run via. Docker

`yarn docker {number-of-concurrent-tabs}`

### Service design and structure (Tree)

```
lib
├── application
│   └── useCases
│       ├── registerNewUrl.ts
│       └── resolveUrl.ts
├── domain
│   ├── ShortenedUrl.ts
│   ├── Storage.ts
│   └── UrlStoreItem.ts
├── infrastructure
│   ├── config.ts
│   ├── createHashForUrlAddress.ts
│   ├── jsonBodyParser.ts
│   ├── service-locator.ts
│   ├── store.ts
│   └── webserver.ts
└── interfaces
    ├── controllers
    │   ├── register.ts
    │   └── resolve.ts
    └── routeHandlers
        └── default.ts
```

## Test API with curl

### Register a new URL

#### cUrl

```bash
$ curl -XPOST -H 'Content-Type: application/json' localhost:3322/register --data '{"ttlSeconds": 10000000, "address": "https://twitter.com"}'

# HTTP 200
# {
#  "success": true,
#  "data": {
#    "target": "https://twitter.com",
#    "shortened": "http://localhost:3322/f3e57dc69a26"
#  }
#}
```

### Test the URL in Browser or cUrl

#### cUrl

```bash
$ curl -Lv http://localhost:3322/f3e57dc69a26
```

## TODO

- [ ] Integration test coverage
- [ ] Validate register `address` which is a shortened url by service
- [ ] Integrate with Redis for storing urls

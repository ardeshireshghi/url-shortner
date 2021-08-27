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

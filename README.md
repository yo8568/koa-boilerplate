# Koa-Boilerplate

[![code style][standardjs-image]][standardjs-url]

> A boilerplate for building paginated api and view services based on Koa v2

## Features

- ES6/ES2015 support using [Babel](https://babeljs.io)
- Use [MongoDB](https://www.mongodb.com) for the database and [Mongoose](https://github.com/Automattic/mongoose) ODM for schema creation
- Use [Bunyan](https://github.com/trentm/node-bunyan) for logging errors and events
- Use [Nodemon](https://github.com/remy/nodemon) for watching and restarting
- Use [Nunjucks](https://github.com/mozilla/nunjucks) for rendering view
- Use [Jest](https://facebook.github.io/jest) as test framework

## Structure

```
.
├── bin
│   └── server.js            # entry of api server
├── src
│   │ 
│   ├── config               # app configurations
│   ├── controllers          # api implementations
│   ├── middlewares          # middleware implementations
│   │   └── query_parser.js  # mongoose connection service
│   ├── models               # database schema definitions
│   ├── servies              # standalone services
│   │   └── mongoose.js      # mongoose connection service
│   ├── routes.js            # router definitions
│   └── index.js             # koa instance
├── test                     # testing scripts
└── package.json
```

## Usage

### Setup

```
$ npm install
```

### Run Server for Development

```
$ npm run dev
```

*Assign a fixed port*

```
$ npm run dev -- --port 8080
```

### Run for Production

```
$ npm run build
$ npm run start
```

*Assign a fixed port*

```
$ npm run build
$ npm run start -- -- --port 8080
```

### Test

```
$ npm test
```

## License

MIT © [Kenny-Chang]()

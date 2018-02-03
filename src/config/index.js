var path = require('path')

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  root: path.normalize(`${__dirname}/../..`),
  mongoDB: {
    uri: process.env.MONGODB_URI,
    options: {}
  }
}
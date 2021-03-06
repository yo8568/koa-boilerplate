import mongoose from 'mongoose'
import config from '../config'

mongoose.Promise = global.Promise

export default function connectMongoDB () {
  mongoose.connect(config.mongoDB.uri, config.mongoDB.options)

  mongoose.connection
    .on('connected', () => console.log(`Mongoose connection open to ${config.mongoDB.uri}`))
    .on('disconnected', () => console.log('Mongoose connection disconnected'))
    .on('error', (err) => console.error(`Mongoose connection error: ${err}`))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected through app termination')
      process.exit(0)
    })
  })
}

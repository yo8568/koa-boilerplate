import Koa from 'koa'
import session from 'koa-session'
import middlewares from './middlewares'
import routes from './routes'
import connectMongoDB from './services/mongoose'

connectMongoDB()

const app = new Koa()

app.use(session({}, app))
app.use(middlewares())
app.use(routes())

app.on('error', (err, ctx) => {
  if (err.isJoi) ctx.status = 400
  if (ctx.status === 500) console.error('server error', err)
})

export default app

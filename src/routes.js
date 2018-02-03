import Router from 'koa-router'
import { compose } from 'koa-convert'
import { todo, main } from './controllers'
import queryParser from './middlewares/query_parser'

const viewRouter = new Router()
  .get('/', main.index)

const apiRouter = new Router({ prefix: '/api' })
  
  .get('/todo', queryParser.todo, todo.index)
  .post('/todo', todo.create)
  .get('/todo/:id', todo.show)
  .put('/todo/:id', todo.update)
  .delete('/todo/:id', todo.destroy)

export default () => compose([
  viewRouter.routes(),
  viewRouter.allowedMethods(),
  apiRouter.routes(),
  apiRouter.allowedMethods()
])

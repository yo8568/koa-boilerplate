import logger from 'koa-logger'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import cors from 'kcors'
import helmet from 'koa-helmet'
import error from 'koa-json-error'
import convert, { compose } from 'koa-convert'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import config from '../config'
import koaStatic from 'koa-static'
import views from 'koa-views'

const middlewares = [
  koaStatic(config.root + '/static'),
  views(__dirname + '/../views', { map: { html: 'nunjucks' }}),
  logger(),
  cors(),
  helmet(),
  bodyParser(),
  error({
    postFormat: (err, obj) => {
      return (err.isJoi)
        ? { error: pick(err.details[0], ['message', 'path']) }
        : omit(obj, 'stack')
    }
  })
]

if (config.env === 'test') middlewares.shift()

export default () => compose(middlewares)

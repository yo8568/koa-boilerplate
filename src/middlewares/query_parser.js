import aqp from 'api-query-params'

const todo = async (ctx, next) => {
  ctx.state.query = aqp(ctx.querystring, {
    whitelist: ['name']
  })
  ctx.state.query.limit = ctx.state.query.limit || 25
  ctx.state.query.sort = ctx.state.query.sort || '_id'
  ctx.state.query.skip = ctx.state.query.skip || 0

  await next()
}

export default {
  todo
}
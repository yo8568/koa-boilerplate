import querystring from 'querystring'
import { Todo } from '../models'

export default {

  index: async (ctx) => {
    const { limit } = ctx.state.query
    const { docs, offset, total } = await Todo.getByQuery(ctx.state.query)

    const baseUrl = ctx.host + ctx.request.path
    const hasPrev = offset + limit > total || offset
    const hasNext = offset + limit < total

    ctx.body = {
      data: docs,
      paging: {
        total,
        previos: hasPrev ? `${baseUrl}?${querystring.stringify({ ...ctx.request.query, skip: offset > limit ? offset - limit : 0 })}` : undefined,
        next: hasNext ? `${baseUrl}?${querystring.stringify({ ...ctx.request.query, skip: offset + limit })}` : undefined
      }
    }
  },

  create: async (ctx) => {
    const todo = await Todo.create(ctx.request.body)
    ctx.status = 201
    ctx.body = todo
  },

  show: async (ctx) => {
    const todo = await Todo.findById(ctx.params.id)
    if (!todo) ctx.throw(404)
    ctx.status = 200
    ctx.body = todo
  },

  update: async (ctx) => {
    const todo = await Todo.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
    if (!todo) ctx.throw(404)
    ctx.status = 200
    ctx.body = todo
  },

  destroy: async (ctx) => {
    const todo = await Todo.deleteById(ctx.params.id)
    if (!todo) ctx.throw(404)
    ctx.status = 204
    ctx.body = todo
  }

}
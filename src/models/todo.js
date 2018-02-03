import mongoose, { Schema } from 'mongoose'
import mongooseDeletePlugin from 'mongoose-delete'
import mongooseHidden from 'mongoose-hidden'
import mongoosePaginate from 'mongoose-paginate'

const StoreSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' }
}, { collection: 'todo', timestamps: true, versionKey: false })

StoreSchema.set('toJSON', { getters: true, virtuals: true })
StoreSchema.set('toObject', { getters: true, virtuals: true })

StoreSchema.statics = {

  /**
   * Get all undeleted smart ad containers.
   *
   * @return {Promise}  Result of query.
   */
  get () {
    return this.find({ deleted: false })
      .select('-deleted')
  },

   /**
   * Delete a todo by id.
   *
   * @param  {String}  id - The todo id.
   * @return {Promise}
   */
  deleteById (id) {
    return this.findById(id)
      .then(doc => doc.delete())
      .then(doc => ({ id: doc.id, deleted: true }))
      .catch(() => null)
  },

  /**
   * Get by query.
   *
   * @return {Promise}  Result of query.
   */
  getByQuery (query) {
    const { filter, limit, skip, sort } = query
    return this.paginate(
      { ...filter, deleted: false },
      { limit, offset: skip, sort, select: '-deleted' })
  },

}

/**
 * Mongoose Hidden Plugin
 *
 * @see https://github.com/mblarsen/mongoose-hidden
 */
StoreSchema.plugin(mongooseHidden(), {
  hidden: {
    createdAt: true,
    updatedAt: true
  }
})

/**
 * Mongoose Praginate Plugin
 *
 * @see https://github.com/edwardhotchkiss/mongoose-paginate
 */
StoreSchema.plugin(mongoosePaginate)

/**
 * @see https://github.com/dsanel/mongoose-delete
 */
StoreSchema.plugin(mongooseDeletePlugin, { deletedAt: true })

export default mongoose.model('Todo', StoreSchema)
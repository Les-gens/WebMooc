const data = require("./data/data.json")

const fastify = require("fastify")({
  logger: true,
})

/**
 * @namespace index
 * @description GET /
 * Returns a hello world page
 */
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" })
})

/**
 * @namespace books
 * @description GET /books
 * Returns every books found in the database
 */
fastify.get("/books", function (request, reply) {
  reply.send({ books: data.books })
})

/**
 * @namespace users
 * @description GET /users/:id
 * Returns the specified users data
 */
fastify.get("/users/:id", function (request, reply) {
  reply.send({ user: data.users[request.params.id] })
})

/**
 * @namespace users
 * @description GET /users/:id/books
 * Returns every books the specified user has borrowed
 */
fastify.get("/users/:id/books", function (request, reply) {
  borrowed_books = data.books.filter((b) => b.borrowed_by == request.params.id)
  reply.send({ userBorrowed: borrowed_books })
})

/**
 * @namespace index
 * @description GET /
 * Starts the server on port 3000
 */
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})

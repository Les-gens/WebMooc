const data = require("./data/data.json")

const fastify = require("fastify")({
  logger: true,
})

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" })
})

fastify.get("/books", function (request, reply) {
  reply.send({ books: data.books })
})

fastify.get("/users/:id", function (request, reply) {
  reply.send({ user: data.users[request.params.id] })
})

fastify.get("/users/:id/books", function (request, reply) {
  borrowed_books = data.books.filter((b) => b.borrowed_by == request.params.id)
  reply.send({ userBorrowed: borrowed_books })
})

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})

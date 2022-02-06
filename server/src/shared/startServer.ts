import { graphqlServer } from './graphql'
import { app, httpServer } from './http'

const port = process.env.PORT ?? 4000

async function startServer() {
  await graphqlServer.start()
  graphqlServer.applyMiddleware({ app })

  await new Promise<void>(resolve => {
    return httpServer.listen({ port }, resolve)
  })

  console.log(
    `Server Running at: http://localhost:${port}${graphqlServer.graphqlPath}`,
  )
}

startServer()
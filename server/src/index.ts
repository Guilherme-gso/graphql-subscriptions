import { ApolloServer, gql } from 'apollo-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { execute, subscribe } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { randomUUID } from 'crypto'
import { createServer } from 'http'
import * as express from 'express'

const pubSub = new PubSub()

type Message = {
  id: string
  user: string
  content: string
  dateAt: Date
}

type PostMessage = {
  message: Omit<Omit<Message, 'id'>, 'dateAt'>
}

const POST_MESSAGE = 'POST_MESSAGE'

const messages: Message[] = []

const typeDefs = gql`
  scalar Date

  type Message {
    id: ID!
    user: String!
    content: String!
    dateAt: Date!
  }

  input PostMessage {
    user: String!
    content: String!
  }

  type Query {
    getMessages: [Message!]
  }

  type Mutation {
    postMessage(message: PostMessage!): Message!
  }

  type Subscription {
    newMessage: Message!
  }
`
const resolvers = {
  Query: {
    getMessages() {
      return messages
    }
  },
  Mutation: {
    postMessage(_, { message: data }: PostMessage) {
      const message: Message = {
        ...data,
        id: randomUUID(),
        dateAt: new Date()
      }
      messages.push(message)
      pubSub.publish(POST_MESSAGE, { newMessage: message })
      return message
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => {
        return pubSub.asyncIterator([POST_MESSAGE])
      }
    }
  }
}

const app = express()
const httpServer = createServer(app)
const schema = makeExecutableSchema({ typeDefs, resolvers })
const subscriptionsServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: httpServer,
    path: '/graphql'
  }
)
const graphqlServer = new ApolloServer({
  schema,
  resolvers,
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionsServer.close()
        }
      }
    }
  }]
})

async function start() {
  await graphqlServer.start()
  graphqlServer.applyMiddleware({ app })
  await new Promise<void>(resolve => {
    return httpServer.listen({ port: 4000 }, resolve)
  })
  console.log(`Server running on: http://localhost:4000${graphqlServer.graphqlPath}`)
}

start()



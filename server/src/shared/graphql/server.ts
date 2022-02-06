import { ApolloServer } from "apollo-server-express";
import { subscriptions } from '.'
import { schema } from "./schema";

export default new ApolloServer({
  schema,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptions.server.close()
          }
        }
      }
    }
  ]
})

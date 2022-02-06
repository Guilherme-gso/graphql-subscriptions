import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql"
import { graphqlServer } from '.'
import { httpServer } from '../http'
import { schema } from "./schema"
import { connect, disconnect } from "./helpers";

export default SubscriptionServer.create(
  {
    execute,
    subscribe,
    schema,
    onDisconnect: disconnect,
    onConnect: connect
  },
  {
    server: httpServer,
    path: graphqlServer.graphqlPath,
  }
)
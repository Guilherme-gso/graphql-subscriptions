import { split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { HttpLink } from '@apollo/client/link/http'
import { getMainDefinition } from '@apollo/client/utilities'

const [httpLink, wsLink] = [
  new HttpLink({ uri: process.env.REACT_APP_SERVER_URL }),
  new WebSocketLink({
    uri: process.env.REACT_APP_WS_SERVER_URL as string,
    options: {
      reconnect: true,
      timeout: 5000,
    }
  }),
]

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)


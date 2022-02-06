import { useMemo } from "react"
import { v4 as uuid } from 'uuid'
import { ApolloClient, InMemoryCache, split } from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { USER_NAME } from "../constants"
import { useStorage } from "."
import { httpLink, getWsLink } from "../graphql"

export const useGraphqlClient = () => {
  const { get } = useStorage()

  const link = useMemo(() => {
    if (!get(USER_NAME)) return httpLink

    const wsLink = getWsLink({
      reconnect: true,
      connectionParams: {
        sessionUsername: get(USER_NAME),
        sessionId: uuid()
      }
    })

    return split(
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
  }, [get])

  const client = new ApolloClient({
    uri: process.env.SERVER_URL,
    cache: new InMemoryCache(),
    link
  })

  return {
    client,
  }
}
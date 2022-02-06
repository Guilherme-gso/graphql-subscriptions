import { ApolloProvider } from '@apollo/client'
import { useGraphqlClient } from './hooks/useGraphqlClient'
import { AppRoutes } from './routes'

export const App = (): JSX.Element => {
  const { client } = useGraphqlClient()

  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  )
}
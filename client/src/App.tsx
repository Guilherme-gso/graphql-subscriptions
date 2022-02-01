import { ApolloProvider } from '@apollo/client'
import { Chat } from './components/Chat'
import { client } from './graphql'

export const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  )
}
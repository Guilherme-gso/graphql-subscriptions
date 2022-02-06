import { postMessageResolver } from './mutation'
import { getMessagesResolver } from './query'
import { newMessageResolver } from './subscriptions'

export const resolvers = {
  ...getMessagesResolver,
  ...postMessageResolver,
  ...newMessageResolver
}
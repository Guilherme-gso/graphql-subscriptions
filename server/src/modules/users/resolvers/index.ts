import { USER_JOIN, USER_LEFT } from '../../../constants/subscriptions'
import { connectedUsers } from '../../../shared/graphql/helpers'
import { pubSub } from '../../../shared/graphql/pubSub'

export const resolvers = {
  Query: {
    getUsers: () => [...connectedUsers.values()]
  },
  Subscription: {
    userJoin: {
      subscribe: () => pubSub.asyncIterator([USER_JOIN])
    },
    userLeft: {
      subscribe: () => pubSub.asyncIterator([USER_LEFT])
    }
  }
}
import { SUBSCRIPTIONS } from "../../../../constants"
import { pubSub } from "../../../../shared/graphql"

export const newMessageResolver = {
  Subscription: {
    newMessage: {
      subscribe: () => {
        return pubSub.asyncIterator([SUBSCRIPTIONS.POST_MESSAGE])
      }
    }
  }
}
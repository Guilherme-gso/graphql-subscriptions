import { PostMessage } from "../../types";
import { makePostMessageUseCase } from "../../usecases/postMessage";
import { pubSub } from '../../../../shared/graphql'
import { SUBSCRIPTIONS } from "../../../../constants";

export const postMessageResolver = {
  Mutation: {
    postMessage(_, { message }: PostMessage) {
      const postMessageUseCase = makePostMessageUseCase()
      const postedMessage = postMessageUseCase.perform(message)
      pubSub.publish(SUBSCRIPTIONS.POST_MESSAGE, {
        newMessage: postedMessage
      })
      return postedMessage
    }
  }
}
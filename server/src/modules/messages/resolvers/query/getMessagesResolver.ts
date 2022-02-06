import { makeGetMessagesUseCase } from '../../usecases/getMessages'

export const getMessagesResolver = {
  Query: {
    getMessages() {
      const getMessagesUseCase = makeGetMessagesUseCase()
      const messages = getMessagesUseCase.perform()
      return messages
    }
  },
}
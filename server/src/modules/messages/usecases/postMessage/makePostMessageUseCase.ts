import { MemoryMessagesRepository } from "../../repositories/implementations/MemoryMessagesRepository"
import { PostMessageUseCase  } from "."

export const makePostMessageUseCase = () => {
  const messagesRepository = new MemoryMessagesRepository()
  const postMessageUseCase = new PostMessageUseCase(messagesRepository)
  return postMessageUseCase
}
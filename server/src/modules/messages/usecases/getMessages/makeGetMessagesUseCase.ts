import { MemoryMessagesRepository } from "../../repositories/implementations/MemoryMessagesRepository"
import { GetMessagesUseCase } from "."

export const makeGetMessagesUseCase = () => {
  const messagesRepository = new MemoryMessagesRepository()
  const getMessagesUseCase = new GetMessagesUseCase(messagesRepository)
  return getMessagesUseCase
}
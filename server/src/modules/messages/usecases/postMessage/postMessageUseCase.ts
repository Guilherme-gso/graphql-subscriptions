import { MessagesRepository } from "../../repositories/MessagesRepository";
import { CreateMessageDTO, Message } from "../../types";

export class PostMessageUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  public perform(data: CreateMessageDTO): Message {
    return this.messagesRepository.postMessage(data)
  }
}
import { MessagesRepository } from "../../repositories/MessagesRepository";
import { Message } from "../../types";

export class GetMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  public perform(): Message[] {
    const messages = this.messagesRepository.getMessages()
    return messages
  }
}
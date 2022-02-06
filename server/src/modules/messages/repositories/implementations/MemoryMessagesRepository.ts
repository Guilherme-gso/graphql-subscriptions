import { randomUUID } from "crypto";
import { CreateMessageDTO, Message } from "../../types";
import { MessagesRepository } from "../MessagesRepository";

const messages: Message[] = []

export class MemoryMessagesRepository implements MessagesRepository {
  public getMessages(): Message[] {
    return messages
  }

  public postMessage(data: CreateMessageDTO): Message {
    const message: Message = {
      ...data,
      dateAt: new Date(),
      id: randomUUID()
    }
    messages.push(message)
    return message
  }
}
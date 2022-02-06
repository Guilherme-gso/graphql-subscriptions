import { CreateMessageDTO, Message } from "../types";

export interface MessagesRepository {
  getMessages(): Message[]
  postMessage(data: CreateMessageDTO): Message
}
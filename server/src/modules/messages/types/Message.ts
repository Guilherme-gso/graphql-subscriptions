export interface Message {
  id: string
  user: string
  content: string
  dateAt: Date
}

export type CreateMessageDTO  = Omit<Omit<Message, 'id'>, 'dateAt'>

export interface PostMessage {
  message: CreateMessageDTO
}

import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import { mutations, queries, subscriptions } from "../graphql"
import { Message, PostMessageVariables } from "../types"

export const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const [postMessage, postMessagePayload] = useMutation<{ postMessage: Message }>(
    mutations.POST_MESSAGE
  )

  const { data: messageData, loading: isLoadingMessages } = 
    useQuery<{ getMessages: Message[] }>(queries.GET_MESSAGES)

  const { data: newMessageData } = useSubscription(subscriptions.NEW_MESSAGE)

  function sendMessage(message: PostMessageVariables): void {
    postMessage({ variables: { message } })
  }

  useEffect(() => {
    if(messageData) {
      setMessages(
        prev => [...prev, ...messageData.getMessages]
      )
    }
  }, [messageData])

  useEffect(() => {
    if(newMessageData) {
      setMessages(
        prev => [...prev, newMessageData.newMessage]
      )
    }
  }, [newMessageData])

  return {
    sendMessage,
    messages,
    postMessagePayload,
    isLoadingMessages,
  }
}
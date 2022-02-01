import { gql } from '@apollo/client'

export const POST_MESSAGE = gql`
  mutation postMessage($message: PostMessage!) {
    postMessage(message: $message) {
      id,
      user,
      content,
      user,
      dateAt
    }
  }
`
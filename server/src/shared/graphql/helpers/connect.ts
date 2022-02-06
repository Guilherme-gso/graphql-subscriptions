import { ConnectionParams } from "subscriptions-transport-ws";
import { pubSub } from '..'
import { connectedUsers } from '.'
import { USER_JOIN } from "../../../constants/subscriptions";
import { User } from "../../types";

export const connect = (connectionParams: ConnectionParams) => {
  if (!connectionParams) return

  let userJoin: User = {} as User

  const { sessionUsername, sessionId } = connectionParams
  const username = sessionUsername.toLowerCase()
  const isConnected = connectedUsers.has(username)

  if(isConnected) {
    const connectedUser = connectedUsers.get(sessionId)
    if(connectedUser && connectedUser.isOnline) return

    userJoin = {
      ...connectedUser,
      isOnline: true
    }
  }

  userJoin = {
    id: sessionId,
    isOnline: true,
    lastView: new Date(),
    username: sessionUsername
  }

  pubSub.publish(USER_JOIN, { userJoin })
  connectedUsers.set(username, userJoin)

  console.log(`Connected user: ${username}`)
  return { user: userJoin }
}
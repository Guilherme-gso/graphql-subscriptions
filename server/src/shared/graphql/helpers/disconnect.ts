import { ConnectionContext } from "subscriptions-transport-ws";
import { connectedUsers } from ".";
import { pubSub } from ".."
import { USER_LEFT } from "../../../constants/subscriptions";

export const disconnect = async (_:any, context: ConnectionContext) => {
  const initialContext = await context.initPromise
  const user = initialContext?.user

  if (!!user) {
    const newUserData = { ...user, lastView: new Date(), isOnline: false }
    connectedUsers.set(user.username, newUserData)
    pubSub.publish(USER_LEFT, { userLeft: newUserData })
    console.log(`Disconnected user: ${user.username}`)
  }
}
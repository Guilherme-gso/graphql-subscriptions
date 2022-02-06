import { HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ClientOptions } from "subscriptions-transport-ws";

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL });
const getWsLink = (options: ClientOptions): WebSocketLink => {
  return new WebSocketLink({
    uri: process.env.REACT_APP_WS_SERVER_URL as string,
    options
  })
}

export { httpLink, getWsLink }
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { splitLink } from "./splitLink";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.SERVER_URL,
  link: splitLink
})
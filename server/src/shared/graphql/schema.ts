import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "../setup";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
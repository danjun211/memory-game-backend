import { ApolloServer, gql, AuthenticationError } from "apollo-server";
import schema from "./schema";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { getUserId } from "./utils";

const server = new ApolloServer({
  schema,
  context: ({ req }: ExpressContext) => {
    const token = req.headers.authorization || "";

    if (token) {
      const user = getUserId(token.split(" ")[1]);

      return user;
    } else {
      return {
        id: ""
      };
    }
  },
  debug: false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

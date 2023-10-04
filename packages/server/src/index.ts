import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./api/schema/";
import resolvers from "./api/resolvers/";
import mongoConnect from "./utils/db";

const startServer = async () => {
  await mongoConnect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`Server ready at: ${url}`);
};

startServer();

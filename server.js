const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const cors = require("cors");
const http = require("http");
const typeDefs = require("./gql/schema.js");
const resolvers = require("./gql/resolvers.js");
const generateUploadUrl = require("./s3.js");

// GraphQL -> DB Bridge
const PostgresAPI = require("./datasources/pg.js");

// DB
const db = require("./db/models/index.js");
const store = {
  db,
  Post: db.Post,
};

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    //console.log(origin);
    const whitelist = [
      "http://localhost:3000",
      "localhost:3000",
      "http://mog-up.onrender.com",
      "https://mog-up.onrender.com",
      "mog-up.onrender.com",
    ];

    if (origin === undefined) {
      console.log("Server started or origin undefined.");
      callback(null, true);
    } else {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
};

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Apply with express middleware for regular routes
  app.use(cors(corsOptions));

  // Endpoints
  app.get("/s3Url", async (req, res) => {
    try {
      const url = await generateUploadUrl();
      res.send({ url });
    } catch (error) {
      console.log(error);
    }
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      pgAPI: new PostgresAPI({ store }),
    }),
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (err) => {
      // Output errors for debugging
      console.log(err);

      // Don't give the specific errors to the client.
      if (err.message.startsWith("Database Error: ")) {
        return new Error("Internal server error");
      }

      // Don't give the specific errors to the client.
      if (err.message.startsWith("GraphQLError: ")) {
        return new Error("Internal apollo server error");
      }

      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.
      return err;
    },
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    // Apollo Middleware for graphQL requests (needs testing)
    cors: corsOptions,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );

  if (process.env.NODE_ENV === "development") {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  } else {
    console.log(`🚀 Server ready at ${server.graphqlPath}`);
  }
}

startApolloServer(typeDefs, resolvers);

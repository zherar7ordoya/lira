import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import MongoLib from "./mongodb";
import config from "./config";
import depthLimit from "graphql-depth-limit";

import colors from "colors";

const app = express();
app.use(cors());

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: async () => new MongoLib().connect(),
  validationRules: [depthLimit(3)],
});

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.send('<p><a href="/graphql">Cliente GraphQL</a></p>\n');
});

app.listen(config.port, () => {
  console.log(colors.cyan(`\n\tPUERTO:`) + colors.inverse(`\t${config.port}`));
});

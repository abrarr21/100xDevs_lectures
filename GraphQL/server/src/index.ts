import express, { query } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type User {
          name: String!
          id: ID!
          username: String!
          email: String!
          phone: String!
        }
        type Todo {
      id: ID!
      title: String!
      completed: Boolean
      }

      type Query {
        getTodos: [Todo]
        getAllUser: [User]
        getUser(id: ID!): User
      }
      `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          await axios.get(
            "https://jsonplaceholder.typicode.com/users/${todo.id}",
          ),
      },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllUser: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUser: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(6969, () => {
    console.log("Server started at 6969");
  });
};

startServer();

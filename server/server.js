import { ApolloServer } from '@apollo/server';

// Documentation - https://graphql.org/graphql-js/running-an-express-graphql-server/ 
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { startStandaloneServer } from '@apollo/server/standalone';

// import { GraphQLError } from 'graphql';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import express from 'express';
import cors from 'cors';
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';

// database functions
// import database from "./database/database.js";
// import { MongoClient, ObjectId } from "mongodb";
// import songDB from "./database/song_ops.js";
// import composerDB from "./database/composer_ops.js"

import 'dotenv/config'

// graphql
import { typeDefs } from './graphql/types/typeDefs.js';
import { resolvers } from "./graphql/resolvers/resolvers.js";




//Graphql server

const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// enable cors
let corsOptions = {
    origin: ["http://localhost:8080", "https://studio.apollographql.com"],
    credentials: false // <-- REQUIRED backend setting for sending header
};


app.use(
    '/graphql',
    cors(corsOptions),
    express.json(),
    cookieParser(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            // console.log("in context");
            // const token = req.cookies.token;
            // if (token) {
            //     console.log("got token")
            //     const user = jwt.verify(token, "LetMeBeYourAngel");
            //     console.log(user);
            //     return { req, res, user };
            // }

            return { req, res }

        }
    }),
);

await new Promise((resolve) => httpServer.listen({ port: 9000 }, resolve));

console.log("Server started");


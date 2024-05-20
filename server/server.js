import { ApolloServer } from '@apollo/server';

// Documentation - https://graphql.org/graphql-js/running-an-express-graphql-server/ 
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';

import { GraphQLError } from 'graphql';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import express from 'express';
import cors from 'cors';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';

// database functions
import database from "./database/database.js";
import { MongoClient, ObjectId } from "mongodb";
import songDB from "./database/song_ops.js";
import composerDB from "./database/composer_ops.js"

import 'dotenv/config'

// graphql
import { typeDefs } from './graphql/types/typeDefs.js';
import { resolvers } from "./graphql/resolvers/resolvers.js";



let findResults = await songDB.findSongs();
console.log(findResults)
// let result = await composerDB.createComposer(
//     { firstName: "Maverick", lastName: "Gatos", cae: "4" })
//     .catch((error) => {
//         console.log(error);
//     })
// let idUpdate = ObjectId.toString(result.insertedId);
// console.log(idUpdate);

let findAllComposers = await composerDB.findAllComposers({});
console.log(findAllComposers);

// let updateComposer = await composerDB.updateComposer(result.insertedId.toString(), { firstName: "Lemon" })
// console.log(updateComposer.modifiedCount);

// let findComposer = await composerDB.findComposer(findAllComposers[0]._id.toString());
// console.log(findComposer);



// let deleteComposerID = await composerDB.deleteComposer();
// console.log(deleteComposerID)






const test_resolvers = {
    Query: {
        users: () => { return users },
        user: (parent, args, contextValue) => {
            console.log("get user");
            if (!contextValue.user) {
                res.clearCookie("token");
                console.log("throwing an error");
                throw new GraphQLError('You are not authorized to perform this action: GET USER', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });


            };
            console.log(contextValue.user.userID);
            const u = users.find((u) => { return contextValue.user.userID === u.username });
            console.log("This is the user: " + u);
            return u;
        },
        songs: () => songs,
        composers: () => composers,
        artists: () => artists
    },
    Song: {
        composersSongInfo: (parent) => {
            let c = parent.composersSplit.map((composer) => {
                let found = composers.find((c) => { return composer.composerID === c.ID });
                return { composer: found, split: composer.split }
            })
            console.log(c);
            return c;
        },
        artistsSongInfo: (parent) => {
            let a = parent.artistsInfo.map((artist) => {
                let found = artists.find((a) => { return artist.artistsID === a.ID });
                return { artist: found, isFeature: artist.isFeature };
            })
            console.log(a);
            return a;
        }
    },
    Mutation: {
        register: async (parent, { email, password, username }, { req, res }) => {
            res.clearCookie("token");
            // check if user exists
            const foundUser = users.find(u => u.username === username);
            if (foundUser) {
                return null;
            }
            // encrypt passsword
            console.log(password);
            const hash = await bcrypt.hash(password, 10);

            // create user in database with password
            users.push({ email: email, password: hash, username: username })

            const token = jwt.sign({ userID: username }, "LetMeBeYourAngel", { expiresIn: "2h" })

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 900000
            })

            console.log(users.slice(-1));

            return { user: users[users.length - 1], message: "Authenticated" }


        },
        login: async (parent, { username, password }, { req, res }) => {
            res.clearCookie("token");
            // if user exists 
            const foundUser = users.find(u => u.username === username);
            // decrypt password in bcyrpt
            let isEqual = await bcrypt.compare(password, foundUser.hash);
            if (b) {
                const token = jwt.sign({ userID: username }, "LetMeBeYourAngel", { expiresIn: "2h" })
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 900000
                })
                return null;
            }
            return { user: foundUser, message: "Authenticated" }
        },
        logout: (parent, args, { req, res }) => {
            res.clearCookie("token");
            return { user: null, message: "Not_Authenticated" }
        }
    }

}

// Graphql standlone server for testing
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 9000 },
});



// Actual Graphql server

// const app = express();
// const httpServer = http.createServer(app);


// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// await server.start();

// enable cors
let corsOptions = {
    // origin: "http://localhost:8080",
    // credentials: true // <-- REQUIRED backend setting for sending header
};


// app.use(
//     '/graphql',
//     cors(corsOptions),
//     express.json(),
//     cookieParser(),
//     expressMiddleware(server, {
//         context: async ({ req, res }) => {
//             // console.log("in context");
//             const token = req.cookies.token;
//             if (token) {
//                 console.log("got token")
//                 const user = jwt.verify(token, "LetMeBeYourAngel");
//                 console.log(user);
//                 return { req, res, user };
//             }

//             return { req, res }

//         }
//     }),
// );

// await new Promise((resolve) => httpServer.listen({ port: 9000 }, resolve));

// app.get("*", (req, res) => {
//     res.send("Hello, Music Lover")
// })

// app.listen({ port: 9000 }, () =>
//   console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
// );


// const { url } = await startStandaloneServer(server, {
//     listen: { port: 9000 },
// });


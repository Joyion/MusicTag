import { collections, composerPipeline, createObject, database, findObjectByAggregation, findOneObject, songPipeline, updateManyObjects, updateOne, } from "../../database/database.js";
export const resolvers = {
    Query: {
        song: async (parent, args) => {
            let song = await findOneObject(collections.songs, new Object(args.id));
            return song;
        },
        songs: async (parent, args) => {
            let songs = await findObjectByAggregation(collections.songs, songPipeline);
            return songs;
        },
        composers: async (parent, args) => {
            let composers = await findObjectByAggregation(collections.composers, composerPipeline);
            return composers;
        },
        artists: async (parent, args) => {
            let artists = await findObjectByAggregation(collections.artists, []);
            return artists;
        },
        publishers: async (parent, args) => {
            let publishers = await findObjectByAggregation(collections.publishers, []);
            return publishers;
        },

    },
    Mutation: {
        insertSong: async (parent, args) => {
            let id = await createObject(collections.songs, args.song);
            return id;
        },
        insertPublisher: async (parent, args) => {
            let id = await createObject(collections.publishers, args.publisher);
            return id;
        },
        insertComposer: async (parent, args) => {
            let id = await createObject(collections.composers, args.composer);
            return id;
        },
        insertArtist: async (parent, args) => {
            let id = await createObject(collections.artists, args.artist);
            return id;
        },
        updateSong: async (parent, args) => {
            let id = await updateOne(collections.songs, new Object(args.id), args.updatedFields);
            return id;
        },
        updateBatchOfSongs: async (parent, args) => {
            let IDs = args.IDs.map(id => new Object(id));
            let id = await updateManyObjects(collections.songs, IDs, args.updatedFields);
            return id;
        },
        updatePublisher: async (parent, args) => {
            let id = await updateOne(collections.publishers, new Object(args.id), args.updatedFields);
            return id;
        },
        updateComposer: async (parent, args) => {
            let id = await updateOne(collections.composers, new Object(args.id), args.updatedFields);
            return id;
        },
        updateArtist: async (parent, args) => {
            let id = await updateOne(collections.artists, new Object(args.id), args.updatedFields);
            return id;
        },


    }
}


// export const resolvers = {
//     Query: {
//         users: () => { return users },
//         user: (parent, args, contextValue) => {
//             console.log("get user");
//             if (!contextValue.user) {
//                 res.clearCookie("token");
//                 console.log("throwing an error");
//                 throw new GraphQLError('You are not authorized to perform this action: GET USER', {
//                     extensions: {
//                         code: 'FORBIDDEN',
//                     },
//                 });


//             };
//             console.log(contextValue.user.userID);
//             const u = users.find((u) => { return contextValue.user.userID === u.username });
//             console.log("This is the user: " + u);
//             return u;
//         },
//         songs: async () => await songDB.findSongs(),
//         composers: () => composers,
//         artists: () => artists
//     },
//     Mutation: {
//         register: async (parent, { email, password, username }, { req, res }) => {
//             res.clearCookie("token");
//             // check if user exists
//             const foundUser = users.find(u => u.username === username);
//             if (foundUser) {
//                 return null;
//             }
//             // encrypt passsword
//             console.log(password);
//             const hash = await bcrypt.hash(password, 10);

//             // create user in database with password
//             users.push({ email: email, password: hash, username: username })

//             const token = jwt.sign({ userID: username }, "LetMeBeYourAngel", { expiresIn: "2h" })

//             res.cookie("token", token, {
//                 httpOnly: true,
//                 maxAge: 900000
//             })

//             console.log(users.slice(-1));

//             return { user: users[users.length - 1], message: "Authenticated" }


//         },
//         login: async (parent, { username, password }, { req, res }) => {
//             res.clearCookie("token");
//             // if user exists 
//             const foundUser = users.find(u => u.username === username);
//             // decrypt password in bcyrpt
//             let isEqual = await bcrypt.compare(password, foundUser.hash);
//             if (b) {
//                 const token = jwt.sign({ userID: username }, "LetMeBeYourAngel", { expiresIn: "2h" })
//                 res.cookie("token", token, {
//                     httpOnly: true,
//                     maxAge: 900000
//                 })
//                 return null;
//             }
//             return { user: foundUser, message: "Authenticated" }
//         },
//         logout: (parent, args, { req, res }) => {
//             res.clearCookie("token");
//             return { user: null, message: "Not_Authenticated" }
//         }
//     }

// }
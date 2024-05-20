import songDB from "../../database/song_ops.js";


export const resolvers = {
    Query: {
        songs: async (parent, args, contextValue) => {
            try {
                let songs = await songDB.findSongs();
                return songs;
            } catch (error) {

            }
        }
    }
}







export const test_resolvers = {
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
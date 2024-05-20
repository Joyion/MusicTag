export const typeDefs = `#graphql 

type Song {
        id: String,
        songName: String,
        genre: String,
        trackNum: Int,
        album: String,
        moods: [String],
        instruments: [String],
        similarArtists: [String],
        composers: [Int],
        artists: [Int],
        publihsers: [Int],
        composersSplit: [composerSplit],
        publisherSplit: [publisherSplit],
        fileName: String,
        status: String,
        batchFolder: String
    }

type composerSplit {
    composerCAE_IPI: String,
    split: Int
}

type publisherSplit {
    publisherCAE_IPI: String,
    split: Int
}

type Publisher {
    id: String,
    cae_ipi: String,
    publisherName: String
    }

type Composer {
    cae_ipi: String,
    firstName: String,
    lastName: String,
    artistIds: [Int],
    status: String
}

type Artist {
    id: String,
    artistName: String,
    status: String
}

type User {
    email: String,
    password: String,
    firstName: String,
    lastName: String
}


type Query {
    # users: [User],
    # user(id: String!): User,
    # song(id: String!): Song,
    songs: [Song],
    # composer(id: String!): Composer,
    # composers: [Composer],
    # artist(id: String!): Artist,
    # artists: [Artists],

}

# type Mutation {
#         register(email: String, password: String, username: String): AuthPayload
#         login(username: String, password: String): AuthPayload
#         logout(username: String): AuthPayload
#     }

`
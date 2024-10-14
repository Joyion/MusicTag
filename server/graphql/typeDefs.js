export const typeDefs = `#graphql 

type Song {
        _id: ID,
        title: String,
        genre: String,
        trackNumber: Int,
        albumName: String,
        moods: [String],
        instruments: [String],
        similarArtists: [String],
        likes: Int,
        internalRating: Int,
        composers: [Composer],
        artists: [Artist],
        featuredArtists: [Artist]
        publihsers: [Publisher],
        composersSplit: [RoyaltyPercentage],
        publishersSplit: [RoyaltyPercentage],
        mainVersion: String,
        filename: String,
        filepath: String,
        active: Boolean,
        releaseDate: String,
        createdAtDate: String,
    }


input SongInput {
    title: String,
    genre: String,
    trackNumber: Int,
    albumName: String,
    moods: [String],
    instruments: [String],
    similarArtists: [String],
    likes: Int,
    internalRating: Int,
    composerIDs: [String],
    artistIDs: [String],
    featuredArtistIDs: [String]
    publisherIDs: [String]
    composersSplit: [RoyaltyPercentageInput],
    publishersSplit: [RoyaltyPercentageInput],
    active: Boolean,
    filename: String,
    filepath: String,
    releaseDate: String,
}

input RoyaltyPercentageInput {
    id: String!,
    split: Int!
}

type RoyaltyPercentage {
    id: String!,
    split: Int!
}


type Publisher {
    _id: ID,
    cae_ipi: String!,
    name: String!,
    bio: String,
    active: Boolean
    }

input PublisherInput {
    cae_ipi: String,
    name: String,
    bio: String,
    active: Boolean
}

type Composer {
    _id: ID,
    cae_ipi: String,
    firstName: String!,
    lastName: String,
    associatedArtists: [Artist],
    active: Boolean
    bio: String
}

input ComposerInput {
    cae_ipi: String,
    firstName: String,
    lastName: String,
    associatedArtistsIDs: [String],
    active: Boolean,
    bio: String,
}

type Artist {
    _id: ID!,
    name: String!,
    active: Boolean,
    bio: String,
}

input ArtistInput {
    name: String!,
    active: String,
    bio: String,
}

type User {
    email: String,
    password: String,
    firstName: String,
    lastName: String
    adminAccount: Boolean!
}

type Authentication {
    user: User,
    message: String,
}


type Query {
    # users: [User],
    # user(id: String!): User,
    song(id: String!): Song,
    songs: [Song],
    # composer(id: String!): Composer,
    composers: [Composer],
    # artist(id: String!): Artist,
    artists: [Artist],
    publishers: [Publisher]
}

type Mutation {
    insertSong(song: SongInput!): String
    insertPublisher(publisher: PublisherInput!): String,
    insertComposer(composer: ComposerInput!): String,
    insertArtist(artist: ArtistInput!): String,
    updateSong(id: String!, updatedFields: SongInput!): String,
    updateBatchOfSongs(IDs: [String], updatedFields: SongInput!): String,
    updatePublisher(id: String!, updatedFields: PublisherInput!): String,
    updateArtist(id: String!, updatedFields: ArtistInput!): String,
    updateComposer(id: String!, updatedFields: ComposerInput!): String,
    loadSongs(folderPath: String!): [Song]
#         register(email: String, password: String, username: String): Authentication
#         login(username: String, password: String): Authentication
#         logout(username: String): Authentication
    }

`
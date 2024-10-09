// Demo Data


const songs = [
    {
        songName: "Heartbreak",
        genre: "R&B",
        trackNumber: 1,
        albumName: "Hearbraeak Vol 1",
        moods: ["sad", "heartbreak"],
        instruments: ["synths", "saxophone"],
        similarArtists: ["Toni Braxton"],
        likes: 0,
        composerIDs: [1, 2],
        artistIDs: [1],
        publisherIDs: [1],
        filename: "Heartbreak.mp3",
        filepath: "Heartbreak.mp3",
        composersSplit: [
            { composerID: 1, split: 50 },
            { composerID: 2, split: 50 },
        ],
        publishersSplit: [
            { publisherID: 1, split: 50 }
        ],
        status: "active",
        batchFolder: "Release_1"
    }
]

const composers = [
    {
        cae_ipi: "1",
        firstName: "Josh",
        lastName: "Hamilton",
        artistIDs: [1, 2],
        status: "active"
    },
    {
        cae_ipi: "2",
        firstName: "Jax",
        lastName: "Marshall",
        artistIDS: [1],
        status: "active"
    }
]



const artists = [
    {
        name: "NumberOne",
        status: "active"
    },
    {
        name: "Millenium",
        status: "active"
    }

]

const publishers = [
    {
        cae_ipi: "1",
        name: "Universal",
    }
]


export default { songs, composers, artists, publishers };
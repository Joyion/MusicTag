// Demo Data


const songs = [
    {
        songName: "Heartbreak",
        genre: "R&B",
        trackNum: 1,
        album: "Hearbraeak Vol 1",
        moods: ["sad", "heartbreak"],
        instruments: ["synths", "saxophone"],
        similarArtists: ["Toni Braxton"],
        composers: [1, 2],
        artists: [1],
        publishers: [1],
        fileName: "Heartbreak.mp3",
        splitComposer: [
            { composerID: 1, split: 50 },
            { composerID: 2, split: 50 },
        ],
        splitPublisher: [
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
        artistIds: [1, 2],
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
        artistName: "NumberOne",
        status: "active"
    },
    {
        artistName: "Millenium",
        status: "active"
    }

]

const publishers = [
    {
        cae_ipi: "1",
        publisherName: "Universal",
    }
]


export default { songs, composers, artists, publishers };
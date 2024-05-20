export default(listTitle, song) => {
    if(listTitle.toLowerCase == "instruments"){
        console.log("Instruments")
        return song.instruments;
    }

    else if(listTitle.toLowerCase == "descriptions"){
        return song.descriptions;
    }

    else if(listTitle.toLowerCase == "bands"){
        return song.bands
    }

    else if(listTitle.toLowerCase == "films/tv"){
        return song.films/tv
    }
}
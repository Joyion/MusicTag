const mongoose = require("mongoose");

/* 
*****WHY THIS MODEL WAS CREATED*****
This model is used to keep track of the names of releases 
and to create the ISRC code: 
ISRC CODE IS CREATED WITH format US-RRD-[current year]-{track count with six digits}
for examplee the year 2020 the first track uploaded would be, US-RRD-20-00001.

This format is based on the old ISRC format that was used on the old php website,
which used the US-RRD-20-{track id which was mysql table key}

*/

const releaseIsrc = new mongoose.Schema(
    {
        initial: {type: String, default: "true"},
        releases: {type: Array},
        currentYear: {type: Number},
        totalTracksThisYear: {type: Number}
    }
)

module.exports = mongoose.model('Release', releaseIsrc );
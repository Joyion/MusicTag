// CONVERTS GENRE NAME TO CORRESPONDING SOURCE AUDIO GENRE;

let getSourceAudioGenre = (bicues) => {

    console.log("Changing the genres");
    for (let count = 0; count < bicues.length; count++) {

        switch (bicues[count].genreStyle) {

            case "Bumpers - Transitions / Bittersweet":
                bicues[count].genreStyle = "Stingers (Bittersweet)"
                break;
            case "Bumpers - Transitions / Dramatic":
                bicues[count].genreStyle = "Stingers (Dramatic)"
                break;
            case "Bumpers - Transitions / Driving":
                bicues[count].genreStyle = "Stingers (Driving)"
                break;
            case "Bumpers - Transitions / Guitar Fix":
                bicues[count].genreStyle = "Stingers (Guitar FX)"
                break;
            case "Bumpers - Transitions / Holiday":
                bicues[count].genreStyle = "Stingers (Holiday)"
                break;
            case "Bumpers - Transitions / Jazz":
                bicues[count].genreStyle = "Stingers (Jazz)"
                break;
            case "Bumpers - Transitions / Light Hearted":
                bicues[count].genreStyle = "Stingers (Light Hearted)"
                break;
            case "Bumpers - Transitions / Orchestral Dramatic":
                bicues[count].genreStyle = "Stingers (Orchestral)"
                break;
            case "Bumpers - Transitions / Rhythmic":
                bicues[count].genreStyle = "Stingers (Rhythmic)"
                break;
            case "Bumpers - Transitions / Rock - Pop - Blues":
                bicues[count].genreStyle = "Stingers (Rock - Pop - Blues)"
                break;
            case "Bumpers - Transitions / Strangeness":
                bicues[count].genreStyle = "Stingers (Strangeness)"
                break;
            case "Bumpers - Transitions / Suspense":
                bicues[count].genreStyle = "Stingers (Suspense)"
                break;
            case "Bumpers - Transitions / Swells":
                bicues[count].genreStyle = "Stingers (Swells)"
                break;
            case "Bumpers - Transitions / Urban":
                bicues[count].genreStyle = "Stingers (Urban)"
                break;
            case "Bumpers - Transitions / World":
                bicues[count].genreStyle = "Stingers (World)"
                break;
            case "Dance / Ambient - Down Tempo":
                bicues[count].genreStyle = "Dance (Ambient - Down Tempo)"
                break;
            case "Dance / Breaks":
                bicues[count].genreStyle = "Dance (Breaks)"
                break;
            case "Dance / Dance Pop":
                bicues[count].genreStyle = "Dance (Dance Pop)"
                break;
            case "Dance / Disco":
                bicues[count].genreStyle = "Dance (Disco)"
                break;
            case "Dance / Electronica":
                bicues[count].genreStyle = "Dance (Electronica)"
                break;
            case "Dance / House":
                bicues[count].genreStyle = "Dance (House)"
                break;
            case "Dance / Nrg (rave-trance-techno)":
                bicues[count].genreStyle = "Dance (EDM)"
                break;
            case "Dance / Retro":
                bicues[count].genreStyle = "Dance (Retro)"
                break;
            case "Drama / Action - Power":
                bicues[count].genreStyle = "Dance (Action - Power)"
                break;
            case "Drama / Bittersweet":
                bicues[count].genreStyle = "Drama (Bittersweet)"
                break;
            case "Drama / Carefree":
                bicues[count].genreStyle = "Drama (Carefree)"
                break;
            case "Drama / Dark - Danger":
                bicues[count].genreStyle = "Drama (Dark - Danger)"
                break;
            case "Drama / Dramatic":
                bicues[count].genreStyle = "Drama (Dramatic)"
                break;
            case "Drama / Horror":
                bicues[count].genreStyle = "Drama (Horror)"
                break;
            case "Drama / Light Hearted":
                bicues[count].genreStyle = "Drama (Light Hearted)"
                break;
            case "Drama / Mood Swings":
                bicues[count].genreStyle = "Drama (Mood Swings)"
                break;
            case "Drama / Mystery - Suspense":
                bicues[count].genreStyle = "Drama (Mystery - Suspense)"
                break;
            case "Drama / Percussive Drama":
                bicues[count].genreStyle = "Drama (Percussive Drama)"
                break;
            case "Drama / Romance":
                bicues[count].genreStyle = "Drama (Romance)"
                break;
            case "Drama / Sci-fi":
                bicues[count].genreStyle = "Drama (Sci-fi)"
                break;
            case "Drama / Solo Instruments - Acoustic Guitar":
                bicues[count].genreStyle = "Drama (Solo Instruments - Acoustic Guitar)"
                break;
            case "Drama / Solo Instruments - Electric Guitar":
                bicues[count].genreStyle = "Drama (Solo Instruments - Electric Guitar)"
                break;
            case "Drama / Solo Instruments - Other":
                bicues[count].genreStyle = "Drama (Solo Instruments - Other)"
                break;
            case "Drama / Solo Instruments - Piano":
                bicues[count].genreStyle = "Drama (Solo Instruments - Piano)"
                break;
            case "Drama / Sorrow - Despair":
                bicues[count].genreStyle = "Drama (Sorrow - Despair)"
                break;
            case "Drama / Strangeness":
                bicues[count].genreStyle = "Drama (Strangeness)"
                break;
            case "Drama / Tension Builder":
                bicues[count].genreStyle = "Drama (Tension Builder)"
                break;
            case "Drama / Thematic":
                bicues[count].genreStyle = "Drama (Thematic)"
                break;
            case "Drama / Triumph - New Beginning":
                bicues[count].genreStyle = "Drama (Triumph - New Beginning)"
                break;
            case "Drama Orchestral / Action - Power":
                bicues[count].genreStyle = "Orchestral (Action - Power)"
                break;
            case "Drama Orchestral / Adventure":
                bicues[count].genreStyle = "Orchestral (Adventure)"
                break;
            case "Drama Orchestral / Bitter Sweet":
                bicues[count].genreStyle = "Orchestral (Bitter Sweet)"
                break;
            case "Drama Orchestral / Carefree":
                bicues[count].genreStyle = "Orchestral (Carefree)"
                break;
            case "Drama Orchestral / Classical":
                bicues[count].genreStyle = "Orchestral (Classical)"
                break;
            case "Drama Orchestral / Dark - Danger":
                bicues[count].genreStyle = "Orchestral (Dark - Danger)"
                break;
            case "Drama Orchestral / Dramatic":
                bicues[count].genreStyle = "Orchestral (Dramatic)"
                break;
            case "Drama Orchestral / Golden Era":
                bicues[count].genreStyle = "Orchestral (Dramatic)"
                break;
            case "Drama Orchestral / Horror":
                bicues[count].genreStyle = "Orchestral (Horror)"
                break;
            case "Drama Orchestral / Light Hearted":
                bicues[count].genreStyle = "Orchestral (Light Hearted)"
                break;
            case "Drama Orchestral / Mood Swings":
                bicues[count].genreStyle = "Orchestral (Mood Swings)"
                break;
            case "Drama Orchestral / Mystery - Suspense":
                bicues[count].genreStyle = "Orchestral (Mystery - Suspense)"
                break;
            case "Drama Orchestral / Percussive Drama":
                bicues[count].genreStyle = "Orchestral (Percussive Drama)"
                break;
            case "Drama Orchestral / Solo Instruments":
                bicues[count].genreStyle = "Orchestral (Solo Instruments)"
                break;
            case "Drama Orchestral / Sorrow - Despair":
                bicues[count].genreStyle = "Orchestral (Sorrow - Despair)"
                break;
            case "Drama Orchestral / Tension Builder":
                bicues[count].genreStyle = "Orchestral (Tension Builder)"
                break;
            case "Drama Orchestral / Triumph - New Beginning":
                bicues[count].genreStyle = "Orchestral (Triumph - New Beginning)"
                break;
            case "Hip-Hop Rnb / Gangsta-Playa-Pimp":
                bicues[count].genreStyle = "Hip-Hop"
                break;
            case "Hip-Hop Rnb / Hip-hop":
                bicues[count].genreStyle = "Hip-Hop"
                break;
            case "Hip-Hop Rnb / Ol skool":
                bicues[count].genreStyle = "Hip-Hop (Old School)"
                break;
            case "Hip-Hop Rnb / Rnb - Soft":
                bicues[count].genreStyle = "RnB"
                break;
            case "Hip-Hop Rnb / Trip-Hop":
                bicues[count].genreStyle = "Trip-Hop"
                break;
            case "Holiday / Contemporary":
                bicues[count].genreStyle = "Holiday (Contemporary)"
                break;
            case "Holiday / Holiday Standards":
                bicues[count].genreStyle = "Holiday (Traditional)"
                break;
            case "Holiday / Public Domain Contemporary":
                bicues[count].genreStyle = "Holiday (Contemporary)"
                break;
            case "Holiday / Public Domain Traditional":
                bicues[count].genreStyle = "Holiday (Traditional)"
                break;
            case "Holiday / Traditional":
                bicues[count].genreStyle = "Holiday (Traditional)"
                break;
            case "Holiday / World":
                bicues[count].genreStyle = "Holiday (World)"
                break;
            case "Jazz / Big Band - Large Ensemble":
                bicues[count].genreStyle = "Jazz (Big Band)"
                break;
            case "Jazz / Jazz Rock":
                bicues[count].genreStyle = "Jazz (Rock)"
                break;
            case "Jazz / Quartet - Small Ensemble":
                bicues[count].genreStyle = "Jazz (Small Ensemble)"
                break;
            case "Jazz / Smooth Jazz":
                bicues[count].genreStyle = "Jazz (Smooth)"
                break;
            case "Jazz / Solo Jazz Instruments":
                bicues[count].genreStyle = "Jazz (Solo Instruments)"
                break;
            case "Jazz / Solo Jazz Instruments":
                bicues[count].genreStyle = "Jazz (Solo Instruments)"
                break;
            case "Reggae - Ska / Reggae - Ska":
                bicues[count].genreStyle = "Reggae - Ska"
                break;
            case "Retro Tv Land / Bumpers Stingers":
                bicues[count].genreStyle = "Retro Tv (Stingers)"
                break;
            case "Retro Tv Land / Dramatic":
                bicues[count].genreStyle = "Retro Tv (Dramatic)"
                break;
            case "Retro Tv Land / Light Hearted":
                bicues[count].genreStyle = "Retro Tv (Light Hearted)"
                break;
            case "Retro Tv Land / Mystery - Suspense":
                bicues[count].genreStyle = "Retro Tv (Mystery - Suspense)"
                break;
            case "Retro Tv Land / Rhythmic Beds":
                bicues[count].genreStyle = "Retro Tv (Rhythmic Beds)"
                break;
            case "Retro Tv Land / Thematic":
                bicues[count].genreStyle = "Retro Tv (Thematic)"
                break;
            case "Retro Tv Land / Thematic":
                bicues[count].genreStyle = "Retro Tv (Thematic)"
                break;
            case "Rock - Blues - Funk / 50's and 60's":
                bicues[count].genreStyle = "Rock (50's and 60's)"
                break;
            case "Rock - Blues - Funk / 70's":
                bicues[count].genreStyle = "Rock (70's)"
                break;
            case "Rock - Blues - Funk / 80's":
                bicues[count].genreStyle = "Rock (80's)"
                break;
            case "Rock - Blues - Funk / Blues":
                bicues[count].genreStyle = "Blues"
                break;
            case "Rock - Blues - Funk / Edgy - Industrial":
                bicues[count].genreStyle = "Rock (Industrial)"
                break;
            case "Rock - Blues - Funk / Funk":
                bicues[count].genreStyle = "Funk"
                break;
            case "Rock - Blues - Funk / Heavy Rock":
                bicues[count].genreStyle = "Rock (Heavy Rock)"
                break;
            case "Rock - Blues - Funk / Pop Rock":
                bicues[count].genreStyle = "Rock (Pop Rock)"
                break;
            case "Score Tools / Band Aids - Hits":
                bicues[count].genreStyle = "Stings and Hits"
                break;
            case "Score Tools / Carefree":
                bicues[count].genreStyle = "Carefree Mixdowns";
                break;
            case "Score Tools / Dramatic":
                bicues[count].genreStyle = "Dramatic Mixdowns";
                break;
            case "Score Tools / Driving":
                bicues[count].genreStyle = "Driving Mixdowns";
                break;
            case "Score Tools / Drones - Textures":
                bicues[count].genreStyle = "Drones - Textures";
                break;
            case "Score Tools / Jazzy":
                bicues[count].genreStyle = "Jazz Mixdowns";
                break;
            case "Score Tools / Musical Fx":
                bicues[count].genreStyle = "Musical Fx";
                break;
            case "Score Tools / Positive Sorrow":
                bicues[count].genreStyle = "Bittersweet Mixdowns";
                break;
            case "Score Tools / Rhythmic":
                bicues[count].genreStyle = "Drums and Bass";
                break;
            case "Score Tools / Rock - Pop":
                bicues[count].genreStyle = "Rock - Pop Mixdowns";
                break;
            case "Score Tools / Techno - Electronica":
                bicues[count].genreStyle = "Techno - Electronica Mixdowns";
                break;
            case "Score Tools / Urban":
                bicues[count].genreStyle = "Urban Mixdowns";
                break;
            case "Specialty / Country - Americana":
                bicues[count].genreStyle = "Country - Americana";
                break;
            case "Specialty / Goofy - Comedic - Kids":
                bicues[count].genreStyle = "Goofy - Comedic - Kids";
                break;
            case "Specialty / Hick Hop":
                bicues[count].genreStyle = "Hick Hop";
                break;
            case "Specialty / Informational":
                bicues[count].genreStyle = "Informational";
                break;
            case "Specialty / News":
                bicues[count].genreStyle = "News";
                break;
            case "Specialty / Patriotic - Heroic":
                bicues[count].genreStyle = "Patriotic - Heroic";
                break;
            case "Specialty / Spiritiual":
                bicues[count].genreStyle = "Spiritiual";
                break;
            case "Specialty / What Were They Thinking":
                bicues[count].genreStyle = "What Were They Thinking";
                break;
            case "Vocal Trax / Dance - Urban":
                bicues[count].genreStyle = "Vocal Tracks (Dance - Urban)";
                break;
            case "Vocal Trax / Rock - Blues":
                bicues[count].genreStyle = "Vocal Tracks (Rock - Blues)";
                break;
            case "Vocal Trax / World":
                bicues[count].genreStyle = "Vocal Tracks (World)";
                break;
            case "World Music / Africa":
                bicues[count].genreStyle = "World Music (Africa)";
                break;
            case "World Music / Australian":
                bicues[count].genreStyle = "World Music (Australian)";
                break;
            case "World Music / Carribean - Island":
                bicues[count].genreStyle = "World Music (Carribean - Island)";
                break;
            case "World Music/ Central European":
                bicues[count].genreStyle = "World Music (Central European)";
                break;
            case "World Music / Contemporary World":
                bicues[count].genreStyle = "World Music (Contemporary)";
                break;
            case "World Music / Dramatic World":
                bicues[count].genreStyle = "World Music (Dramatic)";
                break;
            case "World Music / Far East":
                bicues[count].genreStyle = "World Music (Far East)";
                break;
            case "World Music / Indi - Arab Nations":
                bicues[count].genreStyle = "World Music (Indi - Arab Nations)";
                break;
            case "World Music / Latin":
                bicues[count].genreStyle = "World Music (Latin)";
                break;
            case "World Music / Native American":
                bicues[count].genreStyle = "World Music (Native American)";
                break;
            case "World Pop / African":
                bicues[count].genreStyle = "World Pop (African)";
                break;
            case "World Pop / Eastern":
                bicues[count].genreStyle = "World Pop (Eastern)";
                break;
            case "World Pop / Island":
                bicues[count].genreStyle = "World Pop (Island)";
                break;
            case "World Pop / Latin":
                bicues[count].genreStyle = "World Pop (Latin)";
                break;
            case "World Pop / Reggaeton":
                bicues[count].genreStyle = "World Pop (Reggaeton)";
                break;

        }

    }

    


    return bicues.sort();
}

module.exports = getSourceAudioGenre;
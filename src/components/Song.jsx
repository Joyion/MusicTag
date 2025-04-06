import React from 'react';
// import { setSong, startSetSong } from "../actions/cues.action";
export default function Song({cue, setAudioFile}) {
    // constructor(props) {
    //     super(props);
    //     this.playingSong = this.playingSong.bind(this);
    //     this.editSong = this.editSong.bind(this);
    // }

    const playingSong = (e) => {
        e.preventDefault();
        console.log(`${cue.release}/${cue.fileName}`)
        let fileName = `${cue.release}/${cue.fileName}`;
        setAudioFile(fileName, cue.songTitle);
    }

    const editSong = () => {
        //startSetSong(this.props.cue._id, this.props.dispatch, this.props.history.push);
        // this.props.history.push("/EditSong/" + this.props.cue._id);

    }
        return (
            <div className="song">
                <div className="song__large">
                    <div >
                        <p className="song__title">{cue.songTitle}</p>
                    </div>

                    <div className="song__desc">
                        <p>
                            {cue.descriptions && cue.descriptions.map((d, i) => {
                                let last = cue.descriptions.length - 1;
                                if (i < 5) {
                                    if(i == last){
                                        return d;

                                    }
                                    else if(i == 4){
                                        return d + "..."
                                    }
                                    else{
                                       return d + ", " ;
                                    }
                                    
                                }
                            })}
                        </p>
                    </div>
                </div>

                <div className="song__large" >
                    <div>
                        {cue.composers ? cue.composers.map((c, i) => { return <p key={i}>{c.composer.fullName}</p> }) : " "}
                    </div>
                </div>

                <div className="song__large">
                    <div>
                        {cue.publishers ? cue.publishers.map((p, i) => { return <p key={i}>{`${p.publisher.publisherName}  (${p.publisher.publisherPro}) ${p.split}% `}</p> }) : " "}
                    </div>
                </div>

                <div className="song__tempo">
                    <p>{cue.tempo && cue.tempo}</p>
                </div>

                <div>
                    <button className="song__play" onClick={this.playingSong}>PLAY</button>
                    <button className="song__edit" onClick={this.editSong}>EDIT</button>

                </div>

            </div>
        )
    
}


// const mapStateToProps = (state, ownProps) => ({
//     cue: ownProps.cue

// })

// const myComponent = connect(mapStateToProps)(Song);

// export default withRouter(myComponent);
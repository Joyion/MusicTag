import React from 'react';
import {connect} from "react-redux";

class Song extends React.Component{
    constructor(props){
        super(props);
        this.playingSong = this.playingSong.bind(this);
    }

    playingSong(){
        this.props.playSong();
    }
    
    render(){
        return (
            <div>
                <div>
                    <p>Song Name</p>
                    <p>Descriptions</p>
                </div>
                <div>
                    <p>Composer Name</p>
                </div>
                <div>
                    <p>Tempo</p>
                </div>
                <div>
                    <button>Download Mp3</button>
                    <button>Download Wav</button>
                </div>

            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    playSong: (song) => {dispatch(playSong(song));}
})

export default connect(mapDispatchToProps)(Song);
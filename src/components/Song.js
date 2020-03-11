import React from 'react';


class Song extends React.Component{
    
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

export default Song;
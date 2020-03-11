import React from 'react';
import Song from "./Song";

class ResultTable extends React.Component{

    render(){
        return (
            <div>
                <div>
                    <div><p>Song Title</p></div>
                    <div><p>Composer</p></div>
                    <div><p>Tempo</p></div>
                    <div><p>Actions</p></div>   
                </div>
                <div>
                    <Song />
                </div>             
            </div>
        )
    }
}

export default ResultTable;
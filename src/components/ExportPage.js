import React from 'react';
import ResultTable from "./ResultTable";
import axios from "axios";
//import {withRouter} from "react-router-dom";

class ExportPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            biSongs: [],
            release: ""
        }
       this.getFiles = this.getFiles.bind(this);
       this.exportData = this.exportData.bind(this);
       this.handleRelease = this.handleRelease.bind(this);
    }

    getFiles(){
        axios.get('/api/filename', {params: {release: this.state.release}})
        .then((response) => {
            console.log(response.data);
            let data = JSON.parse(response.data);
            console.log(data[0].fileName);
            this.setState({
                biSongs: JSON.parse(response.data),
                release: ""
            })
        })
        .catch((error) =>{
            console.log(error);
        })

    }

    exportData(){
        console.log("export data")
        axios.get('/api/excel').then(function(response){
            
        });
    }

    handleRelease(e){  
        const release = e.target.value.trim();
        console.log(release);
        this.setState({
            release: release
        })
    }

    render(){
        return (
            <div>
                <p>Folder Name</p>
                <input type="text" value={this.state.release} onChange={this.handleRelease}/>
                <button onClick={this.getFiles}>Load Mp3 Files</button>
                {/* <button onClick={this.exportData}>Export Metadata</button> */}
                <a href="http://localhost:5000/api/excel">Donwload File</a>
                {this.state.biSongs && this.state.biSongs.map((s) =>{
                    return <p key={s.fileName}>{s.fileName}</p>
                })}            
            </div>
        )
    }
}

export default ExportPage;
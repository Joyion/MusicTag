import React from 'react';
import ResultTable from "./ResultTable";
import axios from "axios";
//import {withRouter} from "react-router-dom";

class ExportPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            biSongs: [],
            release: "",
            displayMessage: false,
            message: "",
            error: false
        }
       this.getFiles = this.getFiles.bind(this);
       this.exportData = this.exportData.bind(this);
       this.handleRelease = this.handleRelease.bind(this);
    }

    componentDidMount(){
        this.setState({

        })
    }

    getFiles(){
        axios.get('/api/upload', {params: {release: this.state.release}})
        .then((response) => {
            console.log(response.data);

            let data = JSON.parse(response.data);

            if(data.error == "false"){
                let data = JSON.parse(response.data);
                this.setState({
                    biSongs: data.biCues,
                    release: "",
                    displayMessage: true,
                    message: data.message,
                    error: false
                 })
            }
            else if(data.error = "true"){
                this.setState({
                    ...this.state,
                    biSongs: [],
                    release: "",
                    message: data.message,
                    displayMessage: false,
                    error: true

                })
            }
            
        })
        .catch((error) =>{
            console.log(error);
        })

    }

    exportData(){
        console.log("export data")
        axios.get('/api/export/bi').then(function(response){
            
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
                <p>{this.state.error && this.state.message}</p>
                <p>{this.state.displayMessage && this.state.message }</p>
                <p>Folder Name</p>
                <input type="text" value={this.state.release} onChange={this.handleRelease}/>
                <button onClick={this.getFiles}>Load Wav Files</button>
                {/* <button onClick={this.exportData}>Export Metadata</button> */}
                
                    <a href="/api/export/bi">Donwload Source Audio Metadata</a>
            
                
                {this.state.biSongs && this.state.biSongs.map((s) =>{
                    return <p key={s.fileName}>{s.fileName}</p>
                })}            
            </div>
        )
    }
}

export default ExportPage;
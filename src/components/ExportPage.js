import React from 'react';
import {startGetReleases} from "../actions/cues.action"

import axios from "axios";
import { connect } from "react-redux"

//import {withRouter} from "react-router-dom";

class ExportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            biSongs: [],
            release: "",
            displayMessage: false,
            message: "",
            error: false,
            release: "",
            exportRelease: "All",
        }
        this.getFiles = this.getFiles.bind(this);
        this.exportData = this.exportData.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleReleaseSelection = this.handleReleaseSelection.bind(this);
    }

    componentDidMount() {
        startGetReleases(this.props.dispatch)
        
       
    }

    getFiles() {
        axios.get('/api/upload', { params: { release: this.state.release } })
            .then((response) => {
                console.log(response.data);

                let data = JSON.parse(response.data);

                if (data.error == "false") {
                    let data = JSON.parse(response.data);
                    this.setState({
                        biSongs: data.biCues,
                        release: "",
                        displayMessage: true,
                        message: data.message,
                        error: false
                    })
                }
                else if (data.error = "true") {
                    this.setState({
                        ...this.state,
                        biSongs: [],
                        release: "",
                        message: data.message,
                        displayMessage: false,
                        error: true

                    })
                    startGetReleases(this.props.dispatch);
                }

            })
            .catch((error) => {
                console.log(error);
            })

    }

    exportData() {
        console.log("export data");
        console.log(process.env.IP);
        let filterRelease = "";
        if(this.state.release == "All"){
        
        }
        else {
            filterRelease = this.state.exportRelease;
        }
        console.log("filter " + filterRelease);
        axios.get('/api/export/bi', {params: {release: filterRelease}}).then(function (response) {
            //fileDownload(response.data, "metadata.xlsx")
        });
    }

    handleRelease(e) {
        const release = e.target.value.trim();
        console.log(release);
        this.setState({
            release: release
        })
    }

    handleReleaseSelection(e){
        console.log(e.target.value)
        this.setState({exportRelease: e.target.value})
    }

    render() {
        return (
            <div className="export__container">
               

                {/* <button onClick={this.exportData}>Export Metadata</button> */}

                <div>
                    <h1>Select Release</h1>
                    <select value={this.state.exportRelease} onChange={this.handleReleaseSelection}>
                        <option key={-1} value="All">All</option>
                        {this.props.releases && this.props.releases.map((d, i) => {
                            return <option key={i} value={d}>{d}</option>
                        })}         
                    </select>
                    <h1>Download Metadata Sheets</h1>
                    <a className="export__button" href={"http://" + process.env.IP + ":5000/api/export/bi?release=" + this.state.exportRelease}>Source Audio Metadata</a>
                </div>


                <div>
                    <p>{this.state.error && this.state.message}</p>
                    <p>{this.state.displayMessage && this.state.message}</p>
                    <h1>Upload New Release Folder</h1>
                    <p>Enter Folder Name</p>
                    <input type="text" value={this.state.release} onChange={this.handleRelease} />
                    <button onClick={this.getFiles}>Load WAV Files</button>
                    {this.state.biSongs && this.state.biSongs.map((s) => {
                        return <p key={s.fileName}>{s.fileName}</p>
                    })}
                </div>



            </div>
        )
    }
}

const mapStateToProps = (state, props) =>({
    releases: state.cues.releases

})


export default connect(mapStateToProps)(ExportPage);
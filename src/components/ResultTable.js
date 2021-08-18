import React from 'react';
import Song from "./Song";
import { connect } from "react-redux";
import { startGetCues } from "../actions/cues.action";


class ResultTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.cues.page,
            totalPages: this.props.cues.totalPages,
            selectPage: 1,
            status: this.props.cues.status,
            selectStatus: this.props.cues.status,
            totalCues: this.props.cues.totalCues,
            audioFile: "",
            songPlaying: "",
        }
        this.nextPage = this.nextPage.bind(this);
        this.backPage = this.backPage.bind(this);
        this.handlePgInput = this.handlePgInput.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setAudioFile = this.setAudioFile.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    componentDidMount() {
        console.log("START");
        startGetCues(this.props.cues.page, this.props.cues.status, this.props.dispatch);
    }

    nextPage() {
        console.log("Turning the page");
        console.log(this.props.cues.page + 1);
        const nextPage = this.props.cues.page + 1;
        if (nextPage <= this.props.cues.totalPages && nextPage > 0) {
            startGetCues(nextPage, this.state.status, this.props.dispatch);
            this.setState({
                selectPage: nextPage
            })
        }
    }

    backPage() {
        const backPage = this.props.cues.page - 1;
        if (backPage <= this.props.cues.totalPages && backPage > 0) {
            startGetCues(backPage, this.state.status, this.props.dispatch);
            this.setState({
                selectPage: backPage
            })
        }
    }

    handlePgInput(e) {
        e.preventDefault();
        const newPage = this.state.selectPage;
        if (newPage <= this.props.cues.totalPages && newPage > 0) {
            startGetCues(newPage, this.state.status, this.props.dispatch);

        }
    }

    handleStatus(e) {
        e.preventDefault();
        if (this.state.selectStatus != "Status") {
            startGetCues(1, this.state.selectStatus, this.props.dispatch);
            this.setState({
                status: this.state.selectStatus,
                selectStatus: this.state.selectStatus
            })
        }

    }

    setAudioFile(file, songTitle) {
        this.setState({
            audioFile: "/wav/" + file,
            songPlaying: songTitle
        })

    }

    handlePageChange(e){
        let change = e.target.name;
        if(e.target.value >= 1){
            this.setState({
                [change]: e.target.value
            })
        }
    }

    handleChange(e) {
        let change = e.target.name;
        console.log(change + " " + e.target.value);
        this.setState({
            [change]: e.target.value
        })
    }


    render() {

        return (
            <div>

                <div className="filter__container">
                    <div className="filter__flexcontainer">
                        <div>
                            <h1>Background Instrumentals</h1>
                            <div className="filter__display">
                                <h2>Total Cues: {this.props.cues.totalCues}</h2>
                                <h2 className="filter__status">Status:
                     {this.state.status && this.state.status == "Active" ? <span style={{ color: "green" }}> {this.state.status}</span> :
                                        this.state.status && this.state.status == "Pulled" ? <span style={{ color: "red" }}>{this.state.status}</span> :
                                            this.state.status && this.state.status == "Pending" ? <span style={{ color: "#ffa400" }}>{this.state.status}</span> : ""}
                                </h2>
                            </div>


                            <form onSubmit={this.handleStatus}>
                                <label>
                                    <select name="selectStatus" value={this.state.selectStatus} onChange={this.handleChange}>
                                        {/* <option value="Status"> Status</option> */}
                                        <option value="Pending">Pending</option>
                                        <option value="Active">Active</option>
                                        <option value="Pulled">Pulled</option>
                                    </select>
                                    <input type="submit" value="Update Status" />
                                </label>
                            </form>
                        </div>

                        <div className="filter__pages">

                            <h3>Page {this.props.cues.page} of {this.props.cues.totalPages}</h3>
                            <div className="filter__page__buttons">
                                <form onSubmit={this.handlePgInput}>
                                    <label>

                                        <input onChange={this.handlePageChange} name="selectPage" type="number" value={this.state.selectPage} />
                                        <input type="submit" value="Go To Page" />
                                    </label>
                                </form>
                                <button name="back" onClick={this.backPage}>Back</button>
                                <button name="next" onClick={this.nextPage}>Next</button>
                            </div>


                        </div>
                    </div>
                    <div className="filter__audio">
                        <h4>Playing: {this.state.songPlaying}</h4>
                        <audio controls autoPlay src={this.state.audioFile} type="audio/wav" >
                        </audio>

                    </div>
                    <div className="filter__resultTitles">
                       <div><p>Song Title</p></div>
                       <div><p>Composer</p></div>
                       <div><p>Publisher</p></div>
                       <div><p>Tempo</p></div>
                       <div><p></p></div>
                    </div>

                </div>


                {/* <div>
                    <div><p>Song Title</p></div>
                    <div><p>Composer</p></div>
                    <div><p>Tempo</p></div>
                    <div><p>Actions</p></div>   
                </div> */}
                <div className="resultTable__container">
                    {this.props.cues.cues.length > 0 ? this.props.cues.cues.map((c, i) => {
                        return <Song key={i} cue={c} setAudioFile={this.setAudioFile} />
                    }) : <div style={{ textAlign: "center", position: "relative", top: "20px" }}> <h3 style={{ margin: 0 }}>No Results</h3></div>}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    cues: state.cues
})

const mapDispatchToProps = dispatch => ({
    getCues: (page, filters) => { startGetCues(page, filters); }
})

export default connect(mapStateToProps)(ResultTable);
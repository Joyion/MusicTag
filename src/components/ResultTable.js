import React from 'react';
import Song from "./Song";
import {connect} from "react-redux";
import {startGetCues} from "../actions/cues.action";

class ResultTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            page: this.props.cues.page,
            totalPages: this.props.cues.totalPages,
            selectPage: 1,
            status: "Pending",
            selectStatus: "",
            totalCues: this.props.cues.totalCues,
        }
        this.nextPage = this.nextPage.bind(this);
        this.backPage = this.backPage.bind(this);
        this.handlePgInput = this.handlePgInput.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){
        console.log("START");
        startGetCues(this.props.cues.page, this.props.cues.status, this.props.dispatch);
    }

    nextPage(){
        console.log("Turning the page");
        console.log(this.props.cues.page + 1);
        const nextPage = this.props.cues.page + 1;
        if(nextPage <= this.props.cues.totalPages && nextPage > 0){
            startGetCues(nextPage, this.state.status, this.props.dispatch);
            this.setState({
                selectPage: nextPage
            })
        }
    }
    
    backPage(){
        const backPage = this.props.cues.page - 1;
        if(backPage <= this.props.cues.totalPages && backPage > 0){
            startGetCues(backPage, this.state.status, this.props.dispatch);
            this.setState({
                selectPage: backPage
            })
        }
    }

    handlePgInput(e){
        e.preventDefault();
        const newPage = this.state.selectPage;
        if(newPage <= this.props.cues.totalPages && newPage > 0){
            startGetCues(newPage, this.state.status, this.props.dispatch);
            
        }
    }

    handleStatus(e){
        e.preventDefault();
        startGetCues(1, this.state.selectStatus, this.props.dispatch);
    }

    handleChange(e){
        let change = e.target.name;
        this.setState({
            [change]: e.target.value
        })
    }

    render(){
        return (
            <div>
                <div>
                <p>Total Cues: {this.props.cues.totalCues}</p>
                    <p>Page {this.props.cues.page} of {this.props.cues.totalPages}</p>
                    <p>{this.props.cues.totalPages}</p>
                    
                    <button name="back" onClick={this.backPage}>Back</button>
                    <button name="next" onClick={this.nextPage}>Next</button>
                    
                    <form onSubmit={this.handlePgInput}>
                        <label>
                            Enter page number:
                            <input onChange={this.handleChange} name="selectPage" type="number"  value={this.state.selectPage} />
                            <input type="submit" value="submit"/>
                        </label>
                    </form>
                    <form onSubmit={this.handleStatus}>
                        <label>
                            Status:
                            <select name="selectStatus" value={this.state.selectStatus} onChange={this.handleChange}>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Pulled">Pulled</option>
                            </select>
                            <input type="submit" value="submit"/>
                        </label>
                    </form>
                </div>
                {/* <div>
                    <div><p>Song Title</p></div>
                    <div><p>Composer</p></div>
                    <div><p>Tempo</p></div>
                    <div><p>Actions</p></div>   
                </div> */}
                <div>
                    {this.props.cues.cues.length > 0 ? this.props.cues.cues.map((c, i) => {
                        return <Song key={i} cue={c} />
                    }) : <p>No Results</p>}
                    
                </div>             
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cues: state.cues
})

const mapDispatchToProps = dispatch => ({
    getCues: (page, filters) => {startGetCues(page, filters);}
})

export default connect(mapStateToProps)(ResultTable);
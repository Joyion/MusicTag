import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getSetSong} from "../actions/cues.action"

class EditPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catalogName: "",
            release: "",
            songTitle: "",
            composerFirstName: "",
            composerMiddleName: "",
            composerLastName: "",
            composerSuffix: "",
            composerSplit: 0,
            composerCae: "",
            composerPro: "",
            publisher: "N/A",
            publisherSplit: "",
            publisherPro: "",
            genreStyle: "",
            genre: "",
            style: "",
            description: "",
            instrument: "",
            tempo: "",
            rating: 0,
            band: "",
            film: "",
            duration: "",
            top: "",
            status: "",
            cue: {
               
            }
        }

        // bind functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log("what params? " + this.props.match.params.id);

        this.props.dispatch(getSetSong());
        console.log(this.props.selectSong);
    }


    handleChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const name = e.target.name;
        console.log(name);
        const oldCue = this.state.cue;
        switch (e.target.name) {
            case "songTitleForm":
                const songTitle = this.state.songTitle;
                console.log(songTitle);
                this.setState({
                    songTitle: "",
                    cue: {
                        ...oldCue,
                        songTitle
                    }
                })
                break;
            case "composerForm":
                
                const fullName = 
                this.state.composerFirstName +
                " " +
                this.state.composerMiddleName + 
                " "
                this.state.composerLastName + 
                " "
                this.state.composerSuffix;
                const newComposer = {
                    fullName: fullName,
                    fName: this.state.composerFirstName,
                    mName: this.state.composerMiddleName,
                    lName: this.state.composerLastName,
                    suffix: this.state.composerSuffix,
                    split: this.state.composerSplit,
                    cae: this.state.composerCae,
                    pro: this.state.composerPro,
                }
                oldCue.composers.push(newComposer);
                this.setState({
                    composerFirstName: "",
                    composerMiddleName: "",
                    composerLastName: "",
                    composerSuffix: "",
                    composerSplit: 0,
                    composerCae: "",
                    composerPro: "",
                    cue: {
                        ...oldCue,
                        composers: oldCue.composers

                    }
                })
                break;
            case "publisherForm":
                const oldPubs = this.state.cue.publishers;
                let publisher = {}
                console.log(this.state.publisher)
                switch (this.state.publisher) {
                    case "ASCAP":
                         publisher = {
                            publisherName:"ASCAP",
                            publisherSplit: this.state.publisherSplit,
                            publisherIpi: "1",
                            publisherPro: "ASCAP",
                        }
                        break;
                    case "BMI":
                            publisher = {
                                publisherName: "BMI",
                                publisherSplit: this.state.publisherSplit,
                                publisherIpi: "2",
                                publisherPro: "BMI",
                            }
                        break;
                    case "SOCAN":
                            publisher = {
                                publisherName: "SOCAN",
                                publisherSplit: this.state.publisherSplit,
                                publisherIpi: "3",
                                publisherPro: "SOCAN",
                            }
                        break;
                }
                oldPubs.push(publisher);
                this.setState({
                    publisherName: "",
                    publisherSplit: "",
                    publisherIpi: "",
                    publisherPro: "",
                   cue: {...oldCue,
                    publishers: oldPubs}
                })
                break;
            case "descriptionForm":
                const newWord = this.state.description.trim();
                let descriptions = this.state.cue.descriptions;
                descriptions.push(newWord);
                this.setState({
                    description: "",
                    cue: {
                        ...oldCue,
                        descriptions: descriptions
                    }
                })
                break;
            case "descriptionButton":
                const dbutton = e.target.value;
                let dbuttondesc = this.state.cue.descriptions;
                dbuttondesc.push(dbutton);
                this.setState({
                    descriptionButton: "",
                    cue: {
                        ...oldCue,
                        descriptions: dbuttondesc
                    }
                })
                break;
            case "instrumentForm":
                const newInst = this.state.instrument;
                let instruments = this.state.cue.instruments;
                instruments.push(newInst);
                this.setState({
                    instrument: "",
                    cue: {
                        ...oldCue,
                        instruments: instruments
                    }

                })
                break;
            case "instrumentButton":
                const instBtn = e.target.value;
                let instBtns = this.state.cue.instruments;
                instBtns.push(instBtn);
                this.setState({
                    instrument: "",
                    cue: {
                        ...oldCue,
                        instruments: instBtns
                    }
                })
                break;
            case "bandForm":
                const newBand = this.state.band;
                const bandarray = this.state.cue.bands;
                bandarray.push(newBand);
                this.setState({
                    band: "",
                    cue: {
                        ...oldCue,
                        bands: bandarray
                    }
                })
                break;
            case "filmForm":
                const newFilm = this.state.film;
                let filmarray = this.state.cue.films;
                filmarray.push(newFilm);
                this.setState({
                    film: "",
                    cue: {
                        ...oldCue,
                        films: filmarray
                    }

                })
                break;
        }
    }

    save(){
        const cue = this.state.cue;
        const newGenreStyle = this.state.genre;
        let seperate = newGenreStyle.split("/");
        let newGenre = seperate[0].trim();
        let newStyle = seperate[1].trim();
        this.setState({
            ...cue,
            genreStyle: this.state.genreStyle,
            genre: newGenreStyle,
            style: newStyle, 
            tempo: this.state.tempo,
            rating: this.state.rating,
            top: this.state.top,
            status: this.state.status
        })
        // dispatch update cue l
    }


    render() {
        return (
            <div >

                <div>
                    <p>{!this.props.selectSong.catalogName && " "}</p>
                </div>

                <div>
                    <p>{this.state.cue.songTitle}</p>
                    <form name="songTitleForm" onSubmit={this.handleSubmit}>
                        <label>
                            Change Song Title:
                            <input name="songTitle" type="text" value={this.state.songTitle} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div>
                    <p>Composer Metadata</p>
                </div>

                <div>
                    <p>Composers</p>
                    {this.props.cue.composers && this.props.cue.composers.map((e) => {
                        let fullName = e.fName + " " + e.mName + " " + e.lName + " " + e.suffix + "(" + e.pro + ") " + e.split + "% ";
                        return <button>{fullName}</button>
                    })}
                </div>

                <div>
                    <form name="composerForm" onSubmit={this.handleSubmit}>
                        <label>
                            First Name:
                            <input onChange={this.handleChange} name="composerFirstName" type="text" value={this.state.composerFirstName} />
                        </label>

                        <label>
                            Middle Name:
                            <input onChange={this.handleChange} name="composerMiddleName" type="text" value={this.state.composerMiddleName} />
                        </label>

                        <label>
                            Last Name:
                            <input onChange={this.handleChange} name="composerLastName" type="text" value={this.state.composerLastName} />
                        </label>

                        <label>
                            Suffix:
                            <input onChange={this.handleChange} name="composerSuffix" type="text" value={this.state.composerSuffix} />
                        </label>

                        <label>
                            PRO:
                            <select onChange={this.handleChange} name="composerPro" value={this.state.composerPro}>
                                <option value="ASCAP">ASCAP</option>
                                <option value="BMI">BMI</option>
                                <option value="SOCAN">SOCAN</option>
                                
                            </select>
                        </label>

                        <label>
                            Split:
                            <input onChange={this.handleChange} name="composerSplit" type="number" value={this.state.composerSplit} />
                        </label>

                        <label>
                            CAE:
                            <input onChange={this.handleChange} name="composerCae" type="text" value={this.state.composerCae} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>


                <div>
                    <p>METADATA PUBLISHER</p>
                </div>

                <div>
                    <p>PUBLISHERS</p>
                    {this.state.cue.publishers && this.state.cue.publishers.map((p) => {
                       return <button>{p.publisherName + " " + p.publisherPro + " " + p.publisherSplit}</button>
                    })}
                </div>


                <div>
                    <form name="publisherForm" onSubmit={this.handleSubmit}>
                        <label>
                            Publisher:
                                <select onChange={this.handleChange} name="publisher" value={this.state.publisher}>
                                <option value="BMI">BMI</option>
                                <option value="ASCAP">ASCAP</option>
                                <option value="SOCAN">SOCAN</option>
                                <option value="N/A">N/A</option>
                            </select>
                        </label>
                        <label>
                            Split:
                            <input onChange={this.handleChange} name="publisherSplit" type="number" value={this.state.publisherSplit} />
                        </label>


                        <input type="submit" value="Add New Publisher" />
                    </form>
                </div>

                <div>
                    <form>
                        <label >
                            Genre/Style:
                            <select onChange={this.handleChange} name="genre" value={this.state.genre}>
                                <option value="Hip Hop / Gangsta">Hip Hop</option>
                                <option value="Rock / 50s">Rock / 50s</option>
                            </select>
                        </label>
                    </form>
                </div>


                <div>
                    
                        <label>
                            Tempo:
                            <select onChange={this.handleChange} name="tempo" value={this.state.tempo}>
                                <option value="Fast">Fast</option>
                                <option value="Slow">Slow</option>
                            </select>
                        </label>
                    
                </div>

                <div>
                     
                        <label>
                            Top 40:
                            <select onChange={this.handleChange} name="top" value={this.state.top}>
                                <option value="Rock">Rock</option>
                                <option value="Pop">Pop</option>
                            </select>
                        </label>
                    
                </div>

                <div>
                    <form>
                        <label>
                        Rating: 
                        <select name ="rating" onChange={this.handleChange} value={this.state.rating}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            </select>
                    </label>
                    </form>
                </div>

                <div>
                    <form> 
                        <label>
                            status:
                            <select onChange={this.handleChange} name="status" value={this.state.status}>
                                <option value="Pending">Pending</option>
                                <option value="Active">Active</option>
                                <option value="Pulled">Pulled</option>
                            </select>
                        </label>
                    </form>
                </div>


                <div>
                    <p>Descriptions</p>
                </div>
                <div>
                    <div>
                       <button name="descriptionButton" value="test" onClick={this.handleSubmit}>test</button> 
                    </div>
                    
                    <form name="descriptionForm" onSubmit={this.handleSubmit}> 
                        <label>
                            Add Description:
                            <input type="text" onChange={this.handleChange} name="description" value={this.state.description} />
                            <input type="submit" value="Add Description"/>
                        </label>
                    </form>
                </div>
                
                <div>
                    <h3>Instruments</h3>
                </div>
                <div>
                    <div>
                       <button name="instrumentButton" value="instrument" onClick={this.handleSubmit}>instrument</button> 
                    </div>
                    
                    <form name="instrumentForm" onSubmit={this.handleSubmit}> 
                        <label>
                            Add Instrument:
                            <input type="text" onChange={this.handleChange} name="instrument" value={this.state.instrument} />
                            <input type="submit" value="Submit" />
                        </label>
                    </form>
                </div>
                


                <div>
                    <h3>Bands</h3>
                </div>
                <div>
                    <form name="bandForm" onSubmit={this.handleSubmit}>
                    <label>
                        Add Band: 
                        <input name ="band" type="text" onChange={this.handleChange} value={this.state.band}/>
                        <input type="submit" value="submit"/>
                    </label>
                    </form>
                </div>

                <div>
                    <h3>Sounds Like Films</h3>

                 </div>

                 <div>
                    <form name="filmForm" onSubmit={this.handleSubmit}>
                        Add Film: 
                        <input name ="film" type="text" onChange={this.handleChange} value={this.state.film}/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                




            </div>

        )
    }

}

const mapStateToProps = state => ({
    cue: state.cues.selectSong
})


export default withRouter(connect(mapStateToProps)(EditPage));
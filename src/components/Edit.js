import React from "react";
import { connect } from "react-redux"
import axios from "axios";

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            songTitle: "",
            fName: "",
            mName: "",
            lName: "",
            suffix: "",
            split: 0,
            cae: "",
            pro: "ASCAP",
            publisher: "Derek ASCAP 1",
            publisherSplit: 0,
            genre: this.props.cue.genreStyle || "",
            instrument: "",
            newInstrument: "",
            description: "",
            newDescription: "",
            tempo: this.props.cue.tempo || "",
            rating: this.props.cue.rating || 0,
            band: "",
            film: "",
            top: this.props.cue.top || "",
            status: this.props.cue.status || "",
            cue: {
                ...this.props.cue
            }
        }
        this.getMetadata = this.getMetadata.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.save = this.save.bind(this);
    }

    getMetadata() {
        console.log(this.props.match.params.id);

        axios.post('/api/bicues/getMetadata', {

            id: this.props.match.params.id,

        })
            .then(function (response) {
                const data = JSON.parse(response.data);
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    save(){
        console.log(this.state.cue);
        console.log(this.props.cue);
        
    }

    handleChange(e) {
        // console.log(e.target.name);
        // console.log(e.target.value);
    const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            [name]: value
        })

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.name);
        const name = e.target.name
        if (e.target.name == "songTitle") {
            const cue = {
                ...this.state.cue,
                [e.target.name]: this.state.songTitle.trim()
            }
            this.setState({
                ...this.state,
                cue,
                songTitle: ""
            })
        }
        else if(name == "composer"){
            const fullname = `${this.state.fName.trim()} ${this.state.mName.trim()} ${this.state.lName.trim()} ${this.state.suffix.trim()}`;
            const composer = {
                fullName: fullname.trim(),
                fName: this.state.fName.trim(),
                mName: this.state.mName.trim(),
                lName: this.state.lName.trim(),
                suffix: this.state.suffix.trim(),
                split: this.state.split,
                cae: this.state.cae.trim(),
                pro: this.state.pro
            }
            let cue = this.state.cue;
            cue.composers.push(composer);
            this.setState({
                ...this.state,
                cue,
                fName: "",
                mName: "",
                lName: "",
                suffix: "",
                split: 0,
                cae: "",
                pro: "ASCAP"
,            })
            console.log(cue);
        }

        else if (name == "publisher"){
            let publisherArray = this.state.publisher.split(" ");
            let newPublisher = {
                publisherName: publisherArray[0],
                publisherPro: publisherArray[1],
                publisherIpi: publisherArray[2],
                publisherSplit: this.state.publisherSplit
            }
            let newcue = this.state.cue;
            newcue.publishers.push(newPublisher);
            this.setState({
                ...this.state,
                cue: newcue,
                publisher: "",
                publisherSplit: 0,
            })
            console.log(newcue);
        }

        else if (name == "genre"){
            const genreArray = this.state.genre.split("/");
            const genre = genreArray[0];
            const style = genreArray[1];
            let genreCue = this.state.cue;
            genreCue.genre = genre;
            genreCue.style = style;
            genreCue.genreStyle = this.state.genre;
            this.setState({
                ...this.state,
                cue: genreCue,
                genre: genreCue.genreStyle
            })
            console.log(genreCue);
        }
        else if (name == "instrument"){
            const i = this.state.instrument;
            let cue = this.state.cue;
            cue.instruments.push(i);
            this.setState({
                ...this.state,
                cue,
                instrument: ""
            })
            console.log(instCue);
        }
        else if (name == "newInstrument"){
            const i = this.state.newInstrument.trim();
            let cue = this.state.cue;
            cue.instruments.push(i);
            this.setState({
                ...this.state,
                cue,
                newInstrument: ""
            })
            console.log(cue);
        }

        else if (name == "description"){
            const d = this.state.description;
            let cue = this.state.cue;
            cue.descriptions.push(d);
            this.setState({
                ...this.state,
                cue,
                description: "",
            })
            console.log(cue);
        }

        else if (name == "newDescription"){
            const d = this.state.newDescription.trim();
            let cue = this.state.cue;
            cue.descriptions.push(d);
            this.setState({
                ...this.state,
                cue,
                mewDescription: "",
            })
            console.log(cue);
        }

        else if(name == "tempo"){
            const t = this.state.tempo;
            let tCue = this.state.cue;
            tCue.tempo = t;
            this.setState({
                ...this.state,
                cue: tCue,
                tempo: t
            })
            console.log(tCue);
        }

        else if(name == "rating"){
            const r = this.state.rating;
            let cue = this.state.cue;
            cue.rating = r;
            this.setState({
                ...this.state,
                cue,
                rating: r,
            })
            console.log(cue);
        }

        else if (name == "band"){
            const b = this.state.band.trim();
            let cue = this.state.cue;
            cue.bands.push(b);
            this.setState({
                ...this.state,
                cue,
                band: ""

            })
            console.log(cue);
        }

        else if (name == "film"){
            const f = this.state.film.trim();
            let cue = this.state.cue;
            cue.films.push(f);
            this.setState({
                ...this.state,
                cue,
                film: ""
            })
            console.log(cue);
        }

        else if(name == "top"){
            const top = this.state.top;
            let cue = this.state.cue;
            cue.top = top;
            this.setState({
                ...this.state,
                cue,
                top: top,
            })
            console.log(cue);
        }

        else if (name == "status"){
            const s = this.state.status;
            let cue = this.state.cue;
            cue.status = s;
            this.setState({
                cue,
                status: s
            })
            console.log(cue);
        }
        

    }

    render() {
        return (
            <div>
            <button onClick={this.save}>SAVE</button>
            <p>{this.state.cue.release ? this.state.cue.release : " "}</p>
                <p>{this.state.cue.catalogName ? this.state.cue.catalogName : ""}</p>
                
                <p>{this.state.cue.songTitle}</p>
                <form name="songTitle" onSubmit={this.handleSubmit}>
                    <label>
                        New Title:
                <input name="songTitle" type="text" onChange={this.handleChange} value={this.state.songTitle} />
                        <input type="submit" value="Submit" />
                    </label>
                </form>


                <button onClick={this.getMetadata}>Get Metadata</button>
                <p>{this.state.cue.metadataComposer ? this.state.cue.metadataComposer : ""}</p>
                <p>{this.state.cue.metadataPublisher ? this.state.cue.metadataPublisher : ""}</p>

                <form name="composer" onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input name="fName" value={this.state.fName} type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        Middle Name:
                        <input name="mName" value={this.state.mName} type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        Last Name:
                        <input name="lName" value={this.state.lName} type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        Suffix:
                        <input name="suffix" value={this.state.suffix} type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        CAE:
                        <input name="cae" value={this.state.cae} type="text" onChange={this.handleChange} />
                    </label>
                    <label>
                        PRO:
                        <select value={this.state.pro} name="pro" onChange={this.handleChange}>
                            <option value="ASCAP">ASCAP</option>
                            <option value="BMI">BMI</option>
                            <option value="SOCAN">SOCAN</option>
                        </select>
                    </label>
                    <label>
                        Split:
                        <input value={this.state.split} name="split" type="number" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>

                <form name="publisher" onSubmit={this.handleSubmit}>
                    <label>
                        <select onChange={this.handleChange} name="publisher" value={this.state.publisher}>
                            <option value="Derek ASCAP 1">Derek ASCAP</option>
                            <option value="Luff BMI 2">Luff BMI</option>
                            <option value="Music Socan 3">Music Socan</option>
                        </select>
                    </label>
                    <label>
                        Split: 
                        <input name="publisherSplit" onChange={this.handleChange} type="number" value={this.state.publisherSplit} />
                    </label>
                    <input type="submit" value="Submit"></input>
                </form>

                <form name="genre" onSubmit={this.handleSubmit}>
                    <label>
                        Genre/Style:
                        <select name="genre" onChange={this.handleChange} value={this.state.genre}>
                            <option value="Hip-Hop / Soul">Hip-Hop / Soul</option>
                            <option value="Rock / 50s">Rock / 50s</option>
                            <option value="Dance / Pop">Dance / Pop</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="instrument" onSubmit={this.handleSubmit}>
                    <label>
                        Add Instruments:
                        <select name="instrument" onChange={this.handleChange} value={this.state.instrument}>
                            <option value="trumpet">trumpet</option>
                            <option value="piano">piano</option>
                            <option value="drums">drums</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="newInstrument" onSubmit={this.handleSubmit}>
                    <label>
                        New Instrument:
                        <input onChange={this.handleChange} name="newInstrument" type="text" value={this.state.newInstrument}/>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="description" onSubmit={this.handleSubmit}>
                    <label>
                        Add Description:
                        <select name="description" onChange={this.handleChange} value={this.state.description}>
                            <option value="happy">happy</option>
                            <option value="sad">sad</option>
                            <option value="scared">scared</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="newDescription" onSubmit={this.handleSubmit}>
                    <label>
                        <input onChange={this.handleChange} name="newDescription" type="text" value={this.state.newDescription}/>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

            

                <form name="tempo" onSubmit={this.handleSubmit}>
                    <label>
                        Tempo:
                        <select name="tempo" onChange={this.handleChange} value={this.state.tempo}>
                            <option value="Fast">Fast</option>
                            <option value="Medium">Medium</option>
                            <option value="Slow">Slow</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="rating" onSubmit={this.handleSubmit}>
                    <label>
                        Rating:
                        <input onChange={this.handleChange} name="rating" type="number" value={this.state.rating}/>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="band" onSubmit={this.handleSubmit}>
                    <label>
                        Band:
                        <input onChange={this.handleChange} name="band" type="text" value={this.state.band}/>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="film" onSubmit={this.handleSubmit}>
                    <label>
                        Film:
                        <input onChange={this.handleChange} name="film" type="text" value={this.state.film}/>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="top" onSubmit={this.handleSubmit}>
                    <label>
                        Top 40:
                        <select name="top" onChange={this.handleChange} value={this.state.top}>
                            <option value="Pop">Pop</option>
                            <option value="Rock">Rock</option>
                            <option value="Dance">Dance</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>

                <form name="status" onSubmit={this.handleSubmit}>
                    <label>
                        Status:
                        <select name="status" onChange={this.handleChange} value={this.state.status}>
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Pulled">Pulled</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" /> 
                </form>


            </div>
        )
    }
}



const mapStateToProps = (state, props) => ({
    cue: state.cues.cues.find((cue) => cue._id == props.match.params.id)
});


export default connect(mapStateToProps)(Edit);
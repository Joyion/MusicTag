import React from 'react';
import { connect } from "react-redux"
import { startSetSong, startUpdateCue, startGetComposers } from "../actions/cues.action";
import axios from "axios";

class CorrectEdit extends React.Component {

    constructor(props) {
        super(props);
        const publisherArray = [
            {
                publisherName: "Derek Luff",
                publisherIpi: "1",
                publisherPro: "ASCAP",
            },
            {
                publisherName: "Luff Music",
                publisherIpi: "2",
                publisherPro: "BMI",
            },
            {
                publisherName: "DLM",
                publisherIpi: "3",
                publisherPro: "SOCAN",
            }
        ]
        this.state = {
            proArray: ["ASCAP", "BMI", "SOCAN"],
            catalogName: "",
            songTitle: "",
            fName: "",
            mName: "",
            lName: "",
            suffix: "",
            cSplit: 0,
            cae: "",
            pro: "ASCAP",
            addComposer: -1,
            newSplit: 0,
            publisher: -1,
            publisherArray: publisherArray,
            publisherSplit: 0,
        }




        this.updateComposer = this.updateComposer.bind(this);
        this.removeComposer = this.removeComposer.bind(this);
        this.addComposer = this.addComposer.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updatePublisher = this.updatePublisher.bind(this);
        this.addPublisher = this.addComposer.bind(this);
    }

    componentDidMount() {
        console.log("this is the param: " + this.props.match.params.id);
        let id = this.props.match.params.id;
        startSetSong(id, this.props.dispatch);
        startGetComposers(this.props.dispatch)
    }

    updatePublisher(e) {
        e.preventDefault();
        console.log(this.state.publisher);
        console.log(this.state.publisherSplit);
        if (this.state.publisher != -1) {
            const p = this.state.publisherArray[this.state.publisher];
            if (this.state.publisherSplit == 0) {
                console.log("No split");
            } else {
                console.log(p.publisherName);
            }
        }
        else{
            console.log("No Publisher");
        }




    }

    addPublisher(e) {
        e.preventDefault();
    }

    updateComposer(e) {
        e.preventDefault();
        if (this.state.fName.length > 0) {
            // console.log(this.state);

            let isthisNew = true;
            const id = this.props.match.params.id;
            const fullName = `${this.state.fName.trim()} ${this.state.mName.trim()} ${this.state.lName.trim()} ${this.state.suffix.trim()}`;
            const newComposer = {
                fullName: fullName,
                fName: this.state.fName.trim(),
                mName: this.state.mName.trim(),
                lName: this.state.lName.trim(),
                suffix: this.state.suffix.trim(),
                split: this.state.cSplit,
                cae: this.state.cae.trim(),
                pro: this.state.pro
            }

            if (this.props.composers.length > 0) {
                console.log("in composer lenght");
                let composerBank = [];
                composerBank = this.props.composers.filter((c) => {
                    return c.fullName.toUpperCase() == newComposer.fullName.toUpperCase()
                        && c.cae.toUpperCase() == newComposer.cae.toUpperCase() &&
                        c.pro.toUpperCase() == newComposer.pro.toUpperCase()
                })
                if (composerBank.length > 0) {
                    isthisNew = false;
                }
            }

            console.log(isthisNew);

            //    console.log(newComposer);

            let composers = this.props.cue.composers.map((e) => { return e });
            composers.push(newComposer);
            startUpdateCue(id, "composers", composers, isthisNew, newComposer, this.props.dispatch);
            this.setState({
                fName: "",
                mName: "",
                lName: "",
                suffix: "",
                cSplit: 0,
                cae: "",
                pro: "ASCAP",
            })
        }
        console.log("Everything is empty");

    }

    removeComposer(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        // console.log(e.target.name);
        const composerId = e.target.name;
        let composers = this.props.cue.composers.filter((e) => { return e._id != composerId });
        startUpdateCue(id, "composers", composers, null, null, this.props.dispatch);
    }

    addComposer(e) {

        e.preventDefault();

        if (this.state.addComposer != -1) {
            let c = this.props.composers[this.state.addComposer];
            const id = this.props.match.params.id;
            const newComposer = {
                fullName: c.fullName,
                fName: c.fName,
                mName: c.mName,
                lName: c.lName,
                suffix: c.suffix,
                split: this.state.newSplit,
                cae: c.cae,
                pro: c.pro,
            }
            let composers = this.props.cue.composers.map((e) => { return e });
            composers.push(newComposer);
            startUpdateCue(id, "composers", composers, false, null, this.props.dispatch);
            this.setState({
                addComposer: -1,
                newSplit: 0
            })
        }
        console.log("Nothing to Add")
        
    }



    handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
       // console.log(name + " " + value);
        this.setState({
            [name]: value
        })


    }




    render() {
        return (
            <div>
                <p>EDIT PAGE</p>
                <p>{this.props.cue && this.props.cue.catalogName}</p>
                <p>{this.props.cue && this.props.cue.songTitle}</p>
                <p>{this.props.cue && this.props.cue.metadataComposer}</p>
                <p>{this.props.cue && this.props.cue.metadataPublisher}</p>

                {/* this shows all the current composers on the cue's record */}
                {this.props.cue && this.props.cue.composers ? this.props.cue.composers.length > 0 ?
                    this.props.cue.composers.map((c, i) => {
                        return <button onClick={this.removeComposer} name={c._id} key={i}>  {`${c.fullName} (${c.pro}) ${c.split}%`}</button>
                    })
                    : <p>No Composer data found. Please enter all Composer info</p>
                    : <p>No Composer data found. Please enter all Composer info</p>
                }
                <h3>Add Composer</h3>
                <form onSubmit={this.addComposer}>
                    <label>
                        <select name="addComposer" onChange={this.handleInput} value={this.state.addComposer}>
                            <option value={-1}>Composers</option>
                            {this.props.composers && this.props.composers.map((c, i) => {
                                const info = {
                                    fullName: c.fullName,
                                    fName: c.fName,
                                    mName: c.mName,
                                    lName: c.lName,
                                    suffix: c.suffix,
                                    cae: c.cae,
                                    pro: c.pro,
                                }

                                return <option key={i} value={i}>{`${c.fullName} (${c.pro}) CAE: ${c.cae}`}</option>
                            })}

                        </select>
                    </label>
                    <label>
                        Split:
                 <input onChange={this.handleInput} name="newSplit" type="number" value={this.state.newSplit} />
                    </label>
                    <input type="submit" value="Add Composer" />
                </form>

                <h3>New Composer</h3>
                <form onSubmit={this.updateComposer}>
                    <label>
                        First Name:
                    <input name="fName" value={this.state.fName} type="text" onChange={this.handleInput} />
                    </label>
                    <label>
                        Middle Name:
                    <input name="mName" value={this.state.mName} type="text" onChange={this.handleInput} />
                    </label>
                    <label>
                        Last Name:
                    <input name="lName" value={this.state.lName} type="text" onChange={this.handleInput} />
                    </label>
                    <label>
                        Suffix:
                    <input name="suffix" value={this.state.suffix} type="text" onChange={this.handleInput} />
                    </label>
                    <label>
                        Split:
                    <input name="cSplit" value={this.state.cSplit} type="number" onChange={this.handleInput} />
                    </label>
                    <label>
                        CAE:
                    <input name="cae" value={this.state.cae} type="text" onChange={this.handleInput} />
                    </label>
                    <label>
                        PRO:
                   <select name="pro" value={this.state.pro} onChange={this.handleInput}>
                            {this.state.proArray.map((p, i) => {
                                return <option key={i} value={p}>{p}</option>
                            })}
                        </select>
                        <input type="submit" value="Add New Composer" />
                    </label>
                </form>

                
                <h3>Add Publisher</h3>
                {/* Add Publishing information */}
                <form onSubmit={this.updatePublisher}>
                    <label>
                        Publishers:
                        <select name="publisher" value={this.state.publisher} onChange={this.handleInput}>
                            
                            <option value={-1}>Publishers</option>
                            
                            {this.state.publisherArray && this.state.publisherArray.map((p, i) => {

                                return <option key={i} value={i}>{`${p.publisherName} (${p.publisherPro}) IPI: ${p.publisherIpi}`}</option>
                            })}

                        </select>
                    </label>
                    <label>
                        Split:
                        <input type="number" value={this.state.publisherSplit} name="publisherSplit" onChange={this.handleInput} />
                        <input type="submit" value="Add Publisher" />
                    </label>
                </form>






                {/* this is the last div */}
            </div>

        )
    }
}

const mapStateToProps = (state, props) => ({
    cue: state.cues.selectSong,
    composers: state.cues.composers
})

export default connect(mapStateToProps)(CorrectEdit);
import React from "react";
import {connect} from "react-redux";

class EditSong extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            composer: "Select Composer",
            split: 0,
            newFName: "",
            newMName: "",
            newLName: "",
            newCae: "",
            newSplit: 0,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComposerForm = this.handleComposerForm.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){

    }

    handleComposerForm(e){
        e.preventDefault();  
        if(this.state.composer == "Select Composer"){
            alert("Please select a Composer from drop down list");
        }
        else{
          alert(this.state.composer + " " + this.state.split);
        }
        
    }

    render(){
        return (
            <div>
                <div>
                    <p>Catalog Name</p>
                    <p>Catalog Name</p>
                </div>
                <div>
                    <p>Song Title</p>
                    <p>Song Title</p>
                </div>
                <button>Composer</button>
                <div>   
                    <p>Metadata Composer</p>
                    <p>Composers</p>
                    <div>
                       
                    </div>
                    <div>
                        <form onSubmit={this.handleComposerForm}>
                            <label>
                                Composer:
                                <select name="composer" value={this.state.composer} onChange={this.handleChange}>
                                    {this.props.selectedSong.composerBank.map((c, i) => {
                                        return <option value={c.id}>{c.fullName}</option>
                                    })}
                                    <option value="Select Composer">Select Composer</option>
                                </select> 
                            </label>
                            <label>
                                Split:
                            <input name="split" onChange={this.handleChange} type="number" />   
                            </label>
                            <button type="submit">Submit</button>
                        </form>            
                    </div>
                    <div>
                        <form>
                            <p>Add New Composer</p>
                            <label>
                                First Name:
                                <input value={this.state.newFName} onChange={this.handleChange} name="newFName" type="text"/>
                            </label>
                            <label>
                                Middle Name:
                                <input value={this.state.newMName}  onChange={this.handleChange} name="newMName" type="text"/>
                            </label>
                            <label>
                                Last Name:
                                <input value={this.state.newLName}  onChange={this.handleChange} name="newLName" type="text"/>
                            </label>
                            <label>
                                CAE:
                                <input  value={this.state.newCae} onChange={this.handleChange} name="newIpi" type="text"/>
                            </label>
                            <label>
                                Split:
                                <input value={this.state.newSplit}  onChange={this.handleChange} name="newSplit" type="number"/>
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
               
                

            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    selectedSong: state.selectedSong
})



export default connect(mapStateToProps)(EditSong);
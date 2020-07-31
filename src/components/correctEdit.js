import React from 'react';
import { connect } from "react-redux"
import { startSetSong, startGetCues } from "../actions/cues.action";
import axios from "axios";

class CorrectEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catalogName: ""
        }
    }

    componentDidMount() {
    

        console.log("this is the param: " + this.props.match.params.id);
        let id = this.props.match.params.id;

        startSetSong(id, this.props.dispatch);
       // this.props.dispatch(startSetSong(id));
       


            //  axios.post('/api/bicues/getMetadata', {

            //     id: this.props.match.params.id

            // })
            //     .then( (response) => {

                
            //         const data = JSON.parse(response.data);
            //         console.log(data);
            //         this.setState({...data})
                    
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     })


    }

    componentDidUpdate() {
       

    }

  


    render() {
        return (
            <div>
                <p>DUMB EDIT PAGE</p>
        <p>{this.props.cue && this.props.cue.catalogName}</p>
        <p>{this.props.cue && this.props.cue.songTitle}</p>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    cue: state.cues.selectSong
})

export default connect(mapStateToProps)(CorrectEdit);
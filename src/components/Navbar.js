import React from "react";
import {NavLink} from "react-router-dom";

const NavBar = () => {



    return(
        <div className="navbar-container">
            <div>
                <h1>DL MUSIC</h1>
            </div>
            <div>
                <NavLink className="nav-link" activeClassName="active-links" to="/backgroundInstrumentals">Background Instrumentals</NavLink>
                <NavLink className="nav-link" activeClassName="active-links" to="/IndieArtist">Indie Artist</NavLink>
                
                <NavLink to="/Export">Export</NavLink>
            </div>   
        </div>
    
    )
} 


export default NavBar;
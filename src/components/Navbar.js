import React from "react";
import {NavLink} from "react-router-dom";

const NavBar = () => {



    return(
        <div className="navbar__container">
            <div>
                <h1>DL MUSIC</h1>
            </div>
            <div className="navbar__links">
                <NavLink className="nav-link" activeClassName="active-links" to="/backgroundInstrumentals">Background Instrumentals</NavLink>
                {/* <NavLink className="nav-link" activeClassName="active-links" to="/IndieArtist">Indie Artist</NavLink> */}
                
                <NavLink className="nav-link" activeClassName="active-links" to="/Export">Upload/Export</NavLink>
            </div>   
        </div>
    
    )
} 


export default NavBar;
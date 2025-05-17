import { isPending } from "@reduxjs/toolkit";
import React from "react";
import { NavLink } from "react-router";

export default function NavBar() {

    return(
        <div className="navbar__container">
            <h1>Music Tag</h1>
            <div className="navbar__links">
                <NavLink className={({ isActive, isPending, isTransitioning }) => [
                    isActive ? "active-links" : "nav-link",
                    isPending ? "active-links" : "nav-link",
                    isTransitioning ? "active-links" : "nav-link"
                ].join(" ")} to="/backgroundInstrumentals">Background Instrumentals</NavLink>
                {/* <NavLink className="nav-link" activeClassName="active-links" to="/IndieArtist">Indie Artist</NavLink> */}
                
                <NavLink className={({isActive, isPending, isTransitioning}) => [
                    isActive ? "active-links" : "nav-link",
                    isPending ? "active-links" : "nav-link",
                    isTransitioning ? "active-links" : "nav-link"  
                ]} to="/Export">Upload/Export</NavLink>
            </div>   
        </div>
    
    )
} 
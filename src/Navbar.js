import { NavLink} from "react-router-dom";
import {useState} from "react";
import RoseLogo from "../assets/rose-shape.png";



export default function Navbar(){
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const onMobileButtonClick = (e) => {
        e.preventDefault();
        setMobileNavOpen(!mobileNavOpen);
    }

    const onNavLinkClick = () => {
        if(mobileNavOpen){
            setMobileNavOpen(false);
        }
    }

    return (
    <div className="navbar-container">  

        <div className="desktop-nav">
            <div className="nav-links">
                    <div className="logo abril-fatface-regular">
                        <img src={RoseLogo} />
                        <span><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Black Rose Records</NavLink></span>
                    </div>
                    <ul className="coustard-regular">
                        <li><NavLink to={"/news"} className={({ isActive }) => isActive ? "active-link" : ""}>News</NavLink></li>
                        <li><NavLink to={"/artists"} className={({ isActive }) => isActive ? "active-link" : ""}>Artists</NavLink></li>
                        <li><NavLink to={"/catalog"} className={({ isActive }) => isActive ? "active-link" : ""}>Catalog</NavLink></li>
                        <li><NavLink to={"/ourstory"} className={({ isActive }) => isActive ? "active-link" : ""}>Our Story</NavLink></li>
                    </ul>
            </div>
           
           <div className="nav-content" >
                    <div className="nav-search-form">
                        <form>
                            <input
                                aria-label="Search our site"
                                placeholder="Search our site" />
                            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </div>
                    <div className="login-dropdown">
                        <button className="coustard-regular login-button"><i className="fa-solid fa-user"></i> <span>username</span></button>
                        <div className="login-content">
                            <ul className="coustard-regular">
                            <li>
                                    <NavLink to="/account" className={({ isActive }) => isActive ? "active-link" : ""}>Account Settings</NavLink>
                            </li>
                            <li>
                                    <NavLink to="/playlists" className={({ isActive }) => isActive ? "active-link" : ""}>My Playlists</NavLink>
                            </li>
                            <li>
                                    <NavLink to="/licenses" className={({ isActive }) => isActive ? "active-link" : ""}>My Licenses</NavLink>
                            </li>
                            <li>
                                    <NavLink to="/signout" className={({ isActive }) => isActive ? "active-link" : ""}>Sign Out</NavLink>
                            </li>
                            </ul>
                        </div>
                    </div>
              
           </div>
         

        </div>

        <div className="mobile-nav">
            <div className="logo abril-fatface-regular">
                <img src={RoseLogo} />
                    <span><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick}>Black Rose Records</NavLink></span>
            </div>
            <div onClick={onMobileButtonClick} className="mobile-nav-button">
                <i className="fa-solid fa-bars"></i>
            </div>
        </div>


       <div className="nav-media"> 
        <div>
            <div>
                <p className="coustard-regular">Now Playing - <span>Song Name</span> by <span><NavLink to="#">Artist Name </NavLink></span></p>
                <p className="coustard-regular">from <span><NavLink to="#">Latest Releases</NavLink></span></p>
            </div>
                    <audio controls>
                        <source src="" type="audio/mp3"/>
                    </audio>
        </div>
       </div>


            <div id="mobile-dropdown" className={mobileNavOpen ? "mobile-nav-dropdown show" : "mobile-nav-dropdown"}>
    
                <ul className="coustard-regular">
                    <li><NavLink to="/news" className={({isActive}) => isActive ? "active-link" : ""} onClick={onNavLinkClick}  >News</NavLink></li>
                    <li><NavLink to="/artists" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick}  >Artists</NavLink></li>
                    <li><NavLink to="/catalog" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick} >Catalog</NavLink></li>
                    <li><NavLink to="/ourstory" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick} >Our Story</NavLink></li>  
                    <hr/>
                    <li>
                        <NavLink to="/settings" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick} >Account Settings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/playlists" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick} >My Playlists</NavLink>
                    </li>
                    <li>
                        <NavLink to="/licenses" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick} >My Licenses</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signout">Sign Out</NavLink>
                    </li>
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""} onClick={onNavLinkClick} >Login</NavLink></li>
                    <hr />
                </ul>
          
                <div className="nav-search-form">
                    <form>
                        <input
                            aria-label="Search our site"
                            placeholder="Search our site" />
                        <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
            </div>

     
    </div>)
}
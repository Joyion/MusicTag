import { Link } from "react-router-dom";
import RoseLogo from "../assets/rose-shape.png";

const onMobileButtonClick = (e) => {
    e.preventDefault();
    document.getElementById("mobile-dropdown").classList.toggle("show")
}

export default function Navbar(){

    return (
    <div className="navbar-container">  

        <div className="desktop-nav">
            <div className="nav-links">
                    <div className="logo abril-fatface-regular">
                        <img src={RoseLogo} />
                        <span><a href="#">Black Rose Records</a></span>
                    </div>
                    <ul className="coustard-regular">
                        <li><Link to={"/news"}>News</Link></li>
                        <li><Link to={"/artists"}>Artists</Link></li>
                        <li><Link to={"/catalog"}>Catalog</Link></li>
                        <li><Link to={"/ourstory"}>Our Story</Link></li>
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
                            <ul>

                         
                            <li>
                                <a className="coustard-regular" href="/account">Account Settings</a>
                            </li>
                            <li>
                                <a className="coustard-regular" href="/playlists">My Playlists</a>
                            </li>
                            <li>
                                <a className="coustard-regular" href="/licenses">My Licenses</a>
                            </li>
                            <li>
                                <a className="coustard-regular" href="/signout">Sign Out</a>
                            </li>
                            </ul>
                        </div>
                    </div>
              
           </div>
         

        </div>

        <div className="mobile-nav">
            <div className="logo abril-fatface-regular">
                <img src={RoseLogo} />
                <span><a href="#">Black Rose Records</a></span>
            </div>
            <div onClick={onMobileButtonClick} className="mobile-nav-button">
                <i className="fa-solid fa-bars"></i>
            </div>
        </div>


       <div className="nav-media"> 
        <div>
            <div>
                <p className="coustard-regular">Now Playing - <span>Song Name</span> by <span><a href="#">Artist Name </a></span></p>
                <p className="coustard-regular">from <span><a href="#">Latest Releases</a></span></p>
            </div>
                    <audio controls>
                        <source src="" type="audio/mp3"/>
                    </audio>
        </div>
       </div>


            <div id="mobile-dropdown" className="mobile-nav-dropdown mobile-nav-open">
        
                <ul className="coustard-regular">
                    <li><a href="#">News</a></li>
                    <li><a href="#">Artists</a></li>
                    <li><a href="#">Catalog</a></li>
                    <li><a href="#">Our Story</a></li>  
                    <hr/>
                    <li>
                        <a className="coustard-regular" href="#">Account Settings</a>
                    </li>
                    <li>
                        <a className="coustard-regular" href="#">My Playlists</a>
                    </li>
                    <li>
                        <a className="coustard-regular" href="#">My Licenses</a>
                    </li>
                    <li>
                        <a className="coustard-regular" href="#">Sign Out</a>
                    </li>
                    <li><a href="#">Login</a></li>
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
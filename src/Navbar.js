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
                        <span><Link to="/">Black Rose Records</Link></span>
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
                                <Link className="coustard-regular" to="/account">Account Settings</Link>
                            </li>
                            <li>
                                <Link className="coustard-regular" to="/playlists">My Playlists</Link>
                            </li>
                            <li>
                                <Link className="coustard-regular" to="/licenses">My Licenses</Link>
                            </li>
                            <li>
                                <Link className="coustard-regular" to="/signout">Sign Out</Link>
                            </li>
                            </ul>
                        </div>
                    </div>
              
           </div>
         

        </div>

        <div className="mobile-nav">
            <div className="logo abril-fatface-regular">
                <img src={RoseLogo} />
                <span><Link to="/">Black Rose Records</Link></span>
            </div>
            <div onClick={onMobileButtonClick} className="mobile-nav-button">
                <i className="fa-solid fa-bars"></i>
            </div>
        </div>


       <div className="nav-media"> 
        <div>
            <div>
                <p className="coustard-regular">Now Playing - <span>Song Name</span> by <span><Link to="#">Artist Name </Link></span></p>
                <p className="coustard-regular">from <span><Link to="#">Latest Releases</Link></span></p>
            </div>
                    <audio controls>
                        <source src="" type="audio/mp3"/>
                    </audio>
        </div>
       </div>


            <div id="mobile-dropdown" className="mobile-nav-dropdown mobile-nav-open">
    
                <ul className="coustard-regular">
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/artists">Artists</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/ourstory">Our Story</Link></li>  
                    <hr/>
                    <li>
                        <Link className="coustard-regular" to="#">Account Settings</Link>
                    </li>
                    <li>
                        <Link className="coustard-regular" to="#">My Playlists</Link>
                    </li>
                    <li>
                        <Link className="coustard-regular" to="#">My Licenses</Link>
                    </li>
                    <li>
                        <Link className="coustard-regular" to="#">Sign Out</Link>
                    </li>
                    <li><Link to="#">Login</Link></li>
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
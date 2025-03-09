import RoseLogo from "../assets/rose-shape.png";

const onMobileButtonClick = () => {
    document.getElementById("mobile-dropdown").classList.toggle("show")
}

export const Navbar = () => {

    return (
    <div className="navbar-container">  

        <div className="desktop-nav">
            <div className="nav-links">
                    <div className="logo abril-fatface-regular">
                        <img src={RoseLogo} />
                        <span><a href="#">Black Rose Records</a></span>
                    </div>
                    <ul className="coustard-regular">
                        <li><a href="#">News</a></li>
                        <li><a href="#">Artists</a></li>
                        <li><a href="#">Catalog</a></li>
                        <li><a href="#">Our Story</a></li>
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
                    <a className="coustard-regular"  href="#">Login</a>
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
                <p className="coustard-regular">Now Playing - <span>Song Name</span> by <span><a href="#">Artist Name</a></span></p>
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
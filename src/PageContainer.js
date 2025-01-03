

// import "./styles/components.scss";

import { Outlet } from "react-router-dom"
import RoseLogo from "../assets/rose-shape.png";


export const PageContainer = () => {
    return (
        <div>
            <div className="navbar">

                <div className="nav-links">
                    <ul>
                        <li><a href="#"><img src={RoseLogo} /></a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">News</a></li>
                        <li><a href="#">Our Artists</a></li>
                        <li><a href="#">Our Catalog</a></li>
                        <li><a href="#">Our Story</a></li>
                    </ul>
                </div>



                <div className="search-bar">
                    <div>

                    </div>

                    <uL>
                        <li>
                            <form>
                                <input placeholder="" />
                                <button type="submit">Search</button>
                            </form>
                        </li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                    </uL>
                </div>



            </div>
            <Outlet />

        </div>


    )
}
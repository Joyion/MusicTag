

// import "./styles/components.scss";

import { Outlet } from "react-router-dom"


export const PageContainer = () => {
    return (
        <div>
            <div className="navbar">
                <p>Black Rose Records</p>

                <ul>
                    <li>News</li>
                    <li>Artists</li>
                    <li>Music </li>
                    <li>Our Story</li>
                </ul>
            </div>
            <Outlet />

        </div>


    )
}
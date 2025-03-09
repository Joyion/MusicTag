

// import "./styles/components.scss";

import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar.js";
import RoseLogo from "../assets/rose-shape.png";


export const PageContainer = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>


    )
}
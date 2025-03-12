import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.js"


export default function PageContainer() {
    return (
        <div>
            <Navbar />
            <div className="content-container">
                <Outlet />
            </div>
        </div>


    )
}
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.js"


export default function PageContainer() {
    return (
        <div>
            <Navbar />
            <div className="page-container">
                <Outlet />
            </div>
            <footer>
                <div>
                    <p className="coustard-regular"><a href="#">Contact Us</a> | <a href="#">Demo Submission</a> </p>
                </div>
                <p className="coustard-regular">Black Rose Records@2025</p>
            </footer>

        </div>


    )
}
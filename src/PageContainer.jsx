import { Outlet } from "react-router"
import React from 'react';
import Navbar from "./components/Navbar";




export default function PageContainer() {
    return (
        <>
        <nav>
        <Navbar />
        </nav>
        <Outlet />
        <footer>
        <h2>Fotter here</h2>
        </footer>
        </>
    )
}
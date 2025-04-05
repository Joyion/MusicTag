import { Outlet } from "react-router"
import React from 'react';




export default function PageContainer() {
    return (
        <>
        <nav>
        <h1>Navigation here</h1>
        </nav>
        <Outlet />
        <footer>
        <h2>Fotter here</h2>
        </footer>
        </>
    )
}
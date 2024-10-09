
import Navigation from "../components/Navigation.js"
import { Outlet } from "react-router-dom"
import { createContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../apolloClient.js";


export const UserContext = createContext(null);


export default function PageContainer() {

    const [currentUser, setCurrentUser] = useState(null);



    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}  >
            <div>
                <Navigation />
                <Outlet />
            </div>
        </UserContext.Provider>
    )
}
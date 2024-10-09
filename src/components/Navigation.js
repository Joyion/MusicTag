
import { Link, useNavigate } from "react-router-dom"
import { LOGOUT, GET_USER } from "../apolloClient.js";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { MusicTagGraphqlServer } from "../apolloClient.js";
import { UserContext } from "../pages/PageContainer.js";
import { useContext } from "react";


export default function Navigation() {

    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = useContext(UserContext);
    // const {data: user_data, loading: user_loading, error: user_error} = useQuery(GET_USER)

    const [logout, { data: logout_data, loading: logout_loading, error: logout_error }] = useMutation(LOGOUT);



    function logoutAction() {
        logout({
            variables: {
                username: "1234"
            }, onCompleted: () => {
                setCurrentUser(null);
                // navigate("/")
                MusicTagGraphqlServer.resetStore()
            }
        })
    }

    if (logout_loading || logout_error) { return <div>Logging out...</div> };
    if (logout_error) { return <div>Loading</div> }




    // if (user_error) {
    //     return (
    //         <div className="navigation-bar">
    //         <p><Link to={"/"}>Home</Link></p>
    //         <p><Link to={"/login"}>Login</Link></p>
    //         <p><Link to={"/profile"}>Profile</Link></p>

    //    </div>
    //     )
    // }



    return (
        <div className="navigation-bar">
            <p><Link to={"/"}>Home</Link></p>
            <p><Link to={"/profile"}>Profile</Link></p>
            {!currentUser ? <p><Link to={"/login"}>Login</Link></p> :
                <button onClick={logoutAction}>Logout</button>}
        </div>
    )
}
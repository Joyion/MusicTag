import { useContext, useEffect, useState } from "react";
import { MusicTagGraphqlServer, REGISTER } from "../apolloClient.js";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { UserContext } from './PageContainer.js';
import { useQuery } from "@apollo/client";
import { GET_USER } from "../apolloClient.js";

export default function LoginPage() {

    const navigate = useNavigate();

    const {currentUser,setCurrentUser} = useContext(UserContext);

    const [register, {data: registerData, loading: registerLoading, error: registerError}] = useMutation(REGISTER);


    const [loginInfo, setLoginInfo] = useState({email: "", username: "", password: ""})

    const handleChange = (event) => {
        console.log(event.target.name);
        setLoginInfo(loginInfo => ({...loginInfo, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (e) => {
        register({variables: {
            email: loginInfo.email,
            password: loginInfo.password,
            username: loginInfo.username,
          }, 
        onCompleted: (data) => {
            setCurrentUser(data.register.user)
            navigate("/");
        }
    })}

  

    if (registerLoading) return 'Submitting...';
    if (registerError) return `Submission error! ${registerError.message}`;



    return (
        <div>
            <form onSubmit={e => { 
                e.preventDefault();
                handleSubmit()}
            }>
                <label> Email: 
                    <input
                    type="text"
                    name="email"
                    value={loginInfo.email}
                    placeholder="email"
                    onChange={(e) => {handleChange(e)}}
                    />
                </label>
                <label> Username: 
                    <input
                    type="text"
                    name="username"
                    value={loginInfo.username}
                    placeholder="username"
                    onChange={(e) => {handleChange(e)}}
                    />
                </label>
                <label> Password: 
                    <input
                    type="password"
                    name="password"
                    value={loginInfo.password}
                    placeholder="password"
                    onChange={(e) => {handleChange(e)}}
                    />
                </label>
                <input type="submit" value="login"/>
            </form>
        </div>
    )
}
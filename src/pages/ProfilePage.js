import { gql, useQuery } from '@apollo/client';
import { GET_SONGS, GET_USER, LOGOUT } from '../apolloClient.js';
import { useEffect, useContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { UserContext } from './PageContainer.js';
import { useMutation } from '@apollo/client';
import { MusicTagGraphqlServer } from '../apolloClient.js';
import { Navigate } from 'react-router-dom';
export default function ProfilePage() {

    const navigate = useNavigate();
    
    // const [logout, { data, loading, error }] = useMutation(LOGOUT);
   
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {data: user_data, loading: user_loading, error: user_error} = useQuery(GET_USER, 
        {
            onCompleted: (data) => {
                console.log(data);
                setCurrentUser(data.user)
            },
            fetchPolicy: "network-only"
        })


    if(user_loading) {return <div>Loading...</div>}
    if(!currentUser) { 
        console.log(user_error); 
        return <Navigate to="/login" /> 
    }


    return (
        <div>
            <p>Profile</p>
            <div>
                {/* {data.songs.map((s, index) => (<li key={index}>{s.name}</li>))} */}
                {user_data.user ?  user_data.user.username : " "}
                <p>Test</p>
            </div>
        </div>
    )
}
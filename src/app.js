import React, { useContext } from 'react';
// import ReactDOM from 'react-dom';
import { createContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ProfilePage from './pages/ProfilePage.js';
import LoginPage from './pages/LoginPage.js';
import HomePage from './pages/HomePage.js';
import Navigation from './components/Navigation.js';
import PageContainer from './pages/PageContainer.js';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';

import { MusicTagGraphqlServer } from './apolloClient.js';
import { useQuery } from '@apollo/client';
import { GET_SONGS, GET_USER } from './apolloClient.js';
import ProtectedRoute from './pages/ProtectedRoute.js';




// Styling
import "./styles/index.css";


function App() {

  // const [currentUser, setCurrentUser] = useState({username: ""});

  //   const { loading, error, data } = useQuery(GET_USER, {
  //     variables: {username: currentUser.username},
  //     onError: (error) => {console.log(error)},
  //     onCompleted: (data) => {
  //         setCurrentUser(data.register.user);
  //     }
  // });



  return (
    <ApolloProvider client={MusicTagGraphqlServer}>
      <PageContainer Outlet={<Outlet />} />
    </ApolloProvider>

  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      }

    ]
  },

]);


createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


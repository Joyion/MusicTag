import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route, Navigate } from "react-router";
import { createRoot } from 'react-dom/client';
import PageContainer from './PageContainer.jsx';
import { Provider } from 'react-redux'
import store from './store/configStore.js';
import BIPage from './components/BIPage.jsx';
import ExportPage from './components/ExportPage.jsx';
// import { useNavigate } from 'react-router-dom';

// import ReactDOM from "react-dom";
// import {Provider} from "react-redux";
// import store from "./store/configStore";
// import BIPage from "./components/BIPage";
// import AppRouter from "./router/AppRouter";
// // for styling CSS
// import "normalize-css";
// // own sass style files
import "./styles/index.scss";

const router = createBrowserRouter([
    {
        path: "/",
        Component: PageContainer,
        children: [
        {
            index: true,
            element: <Navigate to={"/backgroundinstrumentals"} replace />
        },
        {
            path: "backgroundinstrumentals",
            element: <BIPage />
        },
        {
            path: "export",
            element: <ExportPage /> // Assuming you have an ExportPage component
        }
        ]
    },
    // {
    //     path: "/dumb",
    //     Component: <h1>Hello</h1> // Dumb page
    // }, {
    //     path: "*",
    //     Component: <div>404 Not Found</div> // 404 page
    // }
]);


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <PageContainer />,
//         children: [
//             {index: true, element: <Navigate to={"/test"} replace/>},
//             { path: "/test", element: <BIPage />},
//         ]
//     }
// ])

const root = createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)



// class App extends React.Component{


//     render(){
//         return (
//             <Provider store={store}>
//                 <AppRouter/>
//             </Provider>
//         )
//     }
// }



// ReactDOM.render(<App />, document.getElementById("app"));
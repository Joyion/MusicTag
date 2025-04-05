import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router"
import { createRoot } from 'react-dom/client';
import PageContainer from './PageContainer.jsx';
import { Provider } from 'react-redux'

// import ReactDOM from "react-dom";
// import {Provider} from "react-redux";
// import store from "./store/configStore";
// import BIPage from "./components/BIPage";
// import AppRouter from "./router/AppRouter";
// // for styling CSS
// import "normalize-css";
// // own sass style files
// import "./styles/styles.scss";

const router = createBrowserRouter([
    {
        path: "/",
        Component: PageContainer,
        children: [
            {index: true, element: <div>Hello</div>}
        ]
    }
])

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
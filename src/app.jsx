import React from 'react';
// import ReactDOM from "react-dom";
// import {Provider} from "react-redux";
// import store from "./store/configStore";
// import BIPage from "./components/BIPage";
// import AppRouter from "./router/AppRouter";
// // for styling CSS
// import "normalize-css";
// // own sass style files
// import "./styles/styles.scss";



import { createRoot } from 'react-dom/client';



const root = createRoot(document.getElementById("app"));
root.render(
    <div>
        <h1>Hello</h1>
    </div>
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
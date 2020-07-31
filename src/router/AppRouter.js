import React from 'react';
import { Router, Switch, Route,Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import BIPage from "../components/BIPage";
export const history = createBrowserHistory();
import Navbar from "../components/Navbar";
import CorrectEdit from "../components/correctEdit"
import EditPage from "../components/EditPage";
import ExportPage from "../components/ExportPage";
import Edit from "../components/Edit";

const AppRouter = () => (

    <Router history={history}>
        <Navbar />
        <Switch>
            <Route exact path="/">
                <Redirect to="/BackgroundInstrumentals"/>
            </Route>
            <Route  path="/BackgroundInstrumentals">
                <BIPage />
            </Route>
            <Route  path="/IndieArtist">
                <BIPage />
            </Route>
            <Route  path="/EditSong/:id" component={CorrectEdit} />
              
            <Route path="/Export">
                <ExportPage />
            </Route>
        </Switch>

    </Router>
)

export default AppRouter;
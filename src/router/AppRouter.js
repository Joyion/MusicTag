import React from 'react';
import { Router, Switch, Route,Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import BIPage from "../components/BIPage";
export const history = createBrowserHistory();
import Navbar from "../components/Navbar";
import EditPage from "../components/EditPage";
import ExportPage from "../components/ExportPage";
import IAPage from '../components/IAPage';
import IAEdit from '../components/IAEditPage';

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
                <IAPage />
            </Route>
            <Route  path="/EditSong/:id" component={EditPage} />
            
            <Route path="/IAEditSong/:id" component={IAEdit} />
              
            <Route path="/Export">
                <ExportPage />
            </Route>
        </Switch>

    </Router>
)

export default AppRouter;
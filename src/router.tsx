import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Table from './pages/table';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Table}/>
            </Switch>
        </BrowserRouter>
    )
}
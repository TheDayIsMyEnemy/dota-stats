import React, { lazy } from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './appHistory';
import Layout from '../components/Layout';

const Matches = lazy(() => import('../pages/Matches'));
const Heroes = lazy(() => import('../pages/Heroes'));
const Teams = lazy(() => import('../pages/Teams'));

const Routes = (): JSX.Element => {
    return <Router history={history}>
        <Layout>
            <Switch>
                <Route exact path='/' component={Heroes} />
                <Route exact path='/matches' component={Matches} />
                <Route exact path='/matches/pro' component={Matches} />
                <Route exact path='/matches/highMmr' component={Matches} />
                <Route exact path="/heroes" component={Heroes}/>
                <Route exact path="/teams" component={Teams}/>
            </Switch>
        </Layout>
    </Router>

}

export default Routes;
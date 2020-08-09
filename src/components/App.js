import React from 'react';
import Auth from './Auth';
import Map from './Map';
import Wait from './Wait';
import Manage from './Manage';
import Queue from './Queue';
import { HashRouter, Route, Switch } from 'react-router-dom';
import QueryString from 'query-string';

import 'bootstrap/dist/css/bootstrap.min.css';


export default class APP extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter basename='/'>
          <Switch>
            {/* Site map page */}
            <Route path='/' exact component={Map}></Route>

            {/* Queue and Wait components provides open access to users,
             which will need authentication if needed */}
            <Route path='/app/queue' render={(props) =>
              <Queue query={QueryString.parse(props.location.search)} />
            }></Route>
            <Route path='/app/wait' render={(props) =>
              <Wait query={QueryString.parse(props.location.search)} />
            }></Route>
            
            <Auth>
              {/* Editing queue info requires authentication */}
              <Route path='/app/manage' component={Manage}></Route>
            </Auth>

          </Switch>
        </HashRouter>
      </div>
    )
  }

}

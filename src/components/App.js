import React from 'react';
import Auth from './Auth';
import SignIn from './SignIn';
import Map from './Map';
import Wait from './Wait';
import Manage from './Manage';
import Queue from './Queue';
import { HashRouter, Route, Switch } from 'react-router-dom';
import QueryString from 'query-string';

export default class APP extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter basename='/'>
          <Switch>
            <Route path='/' exact component={Map}></Route>
            <Route path='/app/signin' component={SignIn}></Route>
            <Route path='/app/queue' render={(props) =>
              <Queue query={QueryString.parse(props.location.search)} />
            }></Route>
            <Route path='/app/wait' render={(props) =>
              <Wait query={QueryString.parse(props.location.search)} />
            }></Route>
            <Auth>
              
              <Route path='/app/manage' component={Manage}></Route>
            </Auth>

          </Switch>
        </HashRouter>
      </div>
    )
  }

}

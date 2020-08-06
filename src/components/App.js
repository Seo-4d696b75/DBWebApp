import React from 'react';

import Map from './Map';
import List from './List';
import Enqueue from './Enqueue';
import Wait from './Wait';
import Add from './Add';
import Manage from './Manage';
import { HashRouter, Route } from 'react-router-dom';
import QueryString from 'query-string';

export default class APP extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter basename='/'>
          <Route path='/' exact component={Map}></Route>
          <Route path='/app/list' component={List}></Route>
          <Route path='/app/add' component={Add}></Route>
          <Route path='/app/enqueue' render={(props) => 
            <Enqueue query={QueryString.parse(props.location.search)}/>
          }></Route>
          <Route path='/app/wait' render={(props) => 
            <Wait query={QueryString.parse(props.location.search)}/>
          }></Route>
          <Route path='/app/manage' render={(props) => 
            <Manage query={QueryString.parse(props.location.search)}/>
          }></Route>
        </HashRouter>
      </div>
    )
  }

}

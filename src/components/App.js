import React from 'react';

import Map from './Map';
import { HashRouter, Route } from 'react-router-dom';

export default class APP extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter basename='/'>
          <Route path='/' component={Map}></Route>
        </HashRouter>
      </div>
    )
  }

}

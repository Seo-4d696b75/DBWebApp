import React from 'react';
import logo from '../img/queue_sample.png';
import './Map.css';
import { Link } from "react-router-dom";

export default class MAP extends React.Component {

  render() {
    return (
      <div className="Map">
        <header className="App-header">
          <h1>Queue Manager</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/app/manage">Queue Soncole</Link>
          <Link to="/app/check">Check Your Entry</Link>
          <a href="/api/docs">API Docs</a>
        </header>
      </div>
    )
  }

}

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
          <ul>
            <li><Link to="/app/list">List of queue</Link></li>
            <li><Link to="/app/add">Add a queue</Link></li>
            <li><Link to="/app/wait">Check your position in queue</Link></li>
          </ul>
        </header>
      </div>
    )
  }

}

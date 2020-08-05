import React from 'react';
import logo from '../img/queue_sample.png';
import './List.css';
import './Common.css';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class List extends React.Component {

  constructor(){
    super();
    this.state = {
      list:[]
    };
  }

  componentDidMount(){
    axios.get('http://133.242.50.211/api/list').then(res => {
      var status = res.data['status'];
      if ( status === 'OK' ){
        this.setState({list: res.data['list']});
        console.log('/api/list', res.data['list']);
      } else {
        console.log('/api/list', status, res.data['msg']);
      }
    });
  }

  onQueueSelected(queue){
    console.log('queue selected', queue);
  }

  render() {
    return (

      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h2>Queue List</h2>
            </div>
          </div>
        </div>
        <div className="Main-frame">
          <div className="Scroll-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.list.map((queue,index) => {
                  return (
                    <tr className="Table-item" key={index} onClick={this.onQueueSelected.bind(this, queue)}>
                      <td className="Table-cell">{queue.name}</td>
                      <td className="Table-cell">{queue.time}</td>
                      <td className="Table-cell">{queue.description}</td>
                      <td className="Table-cell action">
                        <Link to={`/app/enqueue?id=${queue.id}`}><button>Join</button></Link>
                        <Link to={`/app/manage?id=${queue.id}`}><button>Manage</button></Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

}

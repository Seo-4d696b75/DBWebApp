import React from 'react';
import logo from '../img/queue_sample.png';
import sync from '../img/sync.png';
import './List.css';
import './Common.css';
import axios from 'axios';
import {withRouter} from 'react-router';


class Manage extends React.Component {

  constructor(){
    super();
    this.state = {
      list:[],
      queue: null,
      wait_size: null,
      msg: null,
    };
  }

  componentDidMount(){
    this.updateQueue();
  }

  updateQueue(){
    axios.get(`http://133.242.50.211/api/details?id=${this.props.query.id}`).then(res => {
      var status = res.data['status'];
      console.log('/api/details', res.data);
      if ( status === 'OK' ){
        this.setState({
          list: res.data['list'],
          queue: res.data['queue'],
          wait_size: res.data['wait_size']
        });
      } else {
        this.setState(Object.assign(this.state, {
          msg: res.data['msg'],
        }))
      }
    }).catch(err => {
      console.log('/api/details', err);
    })
  }

  onDequeue(entry){
    if ( !this.state.queue ) return;
    console.log("dequeue", this.state.queue, entry);
    const query = {
      id: this.state.queue.id,
      index: entry.index,
    };
    axios.get('http://133.242.50.211/api/dequeue', {params: query}).then(res => {
      var status = res.data['status'];
      console.log('/api/dequeue', res.data);
      if ( status === 'OK' ){
        this.updateQueue();
      } else {
        alert(`Fail to dequeue \nname: ${entry.name}\nmessage: ${res.data['msg']}`);
      }
    }).catch(err => {
      console.log('/api/dequeue', err);
    })
  }

  onRemove(){
    if ( !this.state.queue ) return;
    console.log("remove queue", this.state.queue);
    
    axios.get(`http://133.242.50.211/api/remove?id=${this.state.queue.id}`).then(res => {
      var status = res.data['status'];
      console.log('/api/remove', res.data);
      if ( status === 'OK' ){
        alert(`Success to remove queue \nname: ${this.state.queue.name}`);
        this.props.history.push('/');

      } else {
        alert(`Fail to remove queue\nname: ${this.state.queue.name}\nmessage: ${res.data['msg']}`);
      }
    }).catch(err => {
      console.log('/api/remove', err);
    })

  }

  render() {
    return (

      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h2>Queue Console</h2>
            </div>
          </div>
        </div>
        <div className="Main-frame">
          <div className="Scroll-container">
            <img className="Button sync" src={sync} alt="update status" onClick={this.updateQueue.bind(this)}></img>
            {this.state.queue ? (
                <div>
                  <h2>{this.state.queue.name}</h2>
                  <div>Created at {this.state.queue.time}</div>
                  <p>{this.state.queue.description}</p>
                </div>
            ) : (
            <p>{this.state.msg ? `message: ${this.state.msg}` : 'reading queue infomation'}</p>
            )}
            <table className="Table entry">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.list.map((entry,i) => {
                  return (
                    <tr className="Table-item" key={i} >
                      <td className="Table-cell wait-status">
                        {entry.wait ? (<span className="Status-entry wait">Wait</span>) : (<span className="Status-entry done">Done</span>)}
                      </td>
                      <td className="Table-cell">{entry.name}</td>
                      <td className="Table-cell">{entry.time}</td>
                      <td className="Table-cell action">
                        {entry.wait ? (
                        <button className="Button dequeue" onClick={this.onDequeue.bind(this,entry)}>Dequeue</button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="Button remove" onClick={this.onRemove.bind(this)}>Remove Queue</button>

          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Manage);
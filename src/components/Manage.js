import React from 'react';
import logo from '../img/queue_sample.png';
import sync from '../img/sync.png';
import add from '../img/add.png';
import './Common.css';
import axios from 'axios';
import firebase from '../Firebase';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";


class Manage extends React.Component {

  constructor() {
    super();
    this.state = {
      entry_list: null,
      queue_list: null,
      queue: null,
      err_msg: null,
      add_queue: false,
      name: "",
      description: "",
    };
  }

  componentDidMount() {
    this.updateList();
  }

  updateQueue() {

    firebase.auth().currentUser.getIdToken(true).then(token => {
      return axios.get(`http://133.242.50.211/api/details?id=${this.state.queue.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then(res => {
      var status = res.data['status'];
      console.log('/api/details', res.data);
      if (status === 'OK') {
        this.setState(Object.assign(this.state, {
          entry_list: res.data['list'],
          queue: res.data['queue'],
        }));
      } else {
        this.setState(Object.assign(this.state, {
          msg: res.data['msg'],
        }))
      }
    }).catch(err => {
      console.log('/api/details', err);
    })
  }

  onAddQueue() {
    var user = firebase.auth().currentUser;
    var query = {
      name: this.state.name,
      description: this.state.description,
      creator: user.displayName,
    }
    user.getIdToken(true).then(token => {
      return axios.post('http://133.242.50.211/api/add', query, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then(res => {
      console.log('api/add/', res.data);
      if (res.data['status'] === 'OK') {
        var id = res.data['id']
        this.setState(Object.assign(this.state, {
          queue: { id: id },
          add_queue: false,
          queue_list: null,
          entry_list: null,
        }));
        this.updateQueue();
      } else {
        alert(`Fail to create queue\nMessage: ${res.data['msg']}`);
      }
    }).catch(err => {
      console.log('/api/add', err);
    })
  }

  onDequeue(entry) {
    if (!this.state.queue) return;
    console.log("dequeue", this.state.queue, entry);
    firebase.auth().currentUser.getIdToken(true).then(token => {
      return axios.get(`http://133.242.50.211/api/dequeue?id=${entry.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then(res => {
      var status = res.data['status'];
      console.log('/api/dequeue', res.data);
      if (status === 'OK') {
        this.updateQueue();
      } else {
        alert(`Fail to dequeue \nname: ${entry.name}\nmessage: ${res.data['msg']}`);
      }
    }).catch(err => {
      console.log('/api/dequeue', err);
    })
  }

  updateList() {
    firebase.auth().currentUser.getIdToken(true).then(token => {
      console.log('token', token);
      return axios.get('http://133.242.50.211/api/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then(res => {
      var status = res.data['status'];
      console.log('/api/list', res.data);
      if (status === 'OK') {
        this.setState(Object.assign(this.state, {
          queue_list: res.data['list'],
          queue: null,
          entry_list: null,
        }));
      } else {
        this.setState(Object.assign(this.state, {
          msg: res.data['msg'],
        }));
      }
    }).catch(err => {
      console.log('/api/list', err);
    })
  }

  onRemove() {
    if (!this.state.queue) return;
    console.log("remove queue", this.state.queue);

    firebase.auth().currentUser.getIdToken(true).then(token => {
      return axios.get(`http://133.242.50.211/api/remove?id=${this.state.queue.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then(res => {
      var status = res.data['status'];
      console.log('/api/remove', res.data);
      if (status === 'OK') {
        alert(`Success to remove queue \nname: ${this.state.queue.name}`);
        this.setState(Object.assign(this.state, {
          queue: null,
          entry_list: null,
          queue_list: null,
        }))
        this.updateList();
      } else {
        alert(`Fail to remove queue\nname: ${this.state.queue.name}\nmessage: ${res.data['msg']}`);
      }
    }).catch(err => {
      console.log('/api/remove', err);
    })

  }

  onQueueSelected(queue) {
    console.log('queue selected', queue);
    this.setState(Object.assign(this.state, {
      queue: queue,
      queue_list: null,
    }));
    this.updateQueue();
  }



  onNameChanged(event) {
    this.setState(Object.assign(this.state, {
      name: event.target.value,
    }))
  }

  onDescriptionChanged(event) {
    this.setState(Object.assign(this.state, {
      description: event.target.value,
    }));
  }

  render() {
    return (

      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h3>Queue Console</h3>
            </div>
          </div>
        </div>
        <div className="Content-container">
          <div className="Main-frame">

            {this.state.entry_list ? (
              <img className="Button sync" src={sync} alt="update status" onClick={this.updateQueue.bind(this)}></img>
            ) : null}
            {this.state.queue_list ? (
              <img className="Button add" src={add} alt="add queue" onClick={() => {
                this.setState(Object.assign(this.state, { add_queue: true, }));
              }}></img>
            ) : null}
            {this.state.add_queue ? (
              <div className="Form-container">
                <div className="Form-cancel" onClick={() => { this.setState(Object.assign(this.state, { add_queue: false })) }}>✖</div>
                <div className="Queue-form">
                  <p>Fill in information of queue</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name </td>
                        <td><input className="Input-text queue-name"
                          type='text'
                          maxLength='40'
                          value={this.state.creator_name}
                          onChange={this.onNameChanged.bind(this)} />
                        </td>
                      </tr>
                      <tr>
                        <td>Description </td>
                        <td><input className="Input-text description"
                          type='text'
                          value={this.state.description}
                          onChange={this.onDescriptionChanged.bind(this)} /></td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="Button create" onClick={this.onAddQueue.bind(this)}>Create</button>
                </div>
              </div>
            ) : null}
            <div className="Scroll-container">

              {this.state.msg ? (
                <p>{this.state.msg}</p>
              ) : null}

              {this.state.entry_list ? (
                <div>
                  <h2>{this.state.queue.name}</h2>
                  <Link to={`/app/queue?id=${this.state.queue.id}&qr=true`} target="_blank">Join Queue Page</Link>
                  <div>Created at {this.state.queue.time}</div>
                  <p>{this.state.queue.description}</p>

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
                      {this.state.entry_list.map((entry, i) => {
                        return (
                          <tr className="Table-item" key={i} >
                            <td className="Table-cell wait-status">
                              {entry.wait ? (<span className="Status-entry wait">Wait</span>) : (<span className="Status-entry done">Done</span>)}
                            </td>
                            <td className="Table-cell">{entry.name}</td>
                            <td className="Table-cell">{entry.time}</td>
                            <td className="Table-cell action">
                              {entry.wait ? (
                                <button className="Button dequeue" onClick={this.onDequeue.bind(this, entry)}>Dequeue</button>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <button className="Button remove" onClick={this.onRemove.bind(this)}>Remove Queue</button>

                </div>
              ) : (this.state.queue_list ? (


                <table className="Table queue">
                  <thead>
                    <tr className="Table-header">
                      <th>Name</th>
                      <th>Time</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.queue_list.map((queue, index) => {
                      return (
                        <tr className="Table-item" key={index}>
                          <td className="Table-cell">{queue.name}</td>
                          <td className="Table-cell">{queue.time}</td>
                          <td className="Table-cell">{queue.description}</td>
                          <td className="Table-cell action">
                            <button onClick={this.onQueueSelected.bind(this, queue)}>Manage</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                  <p>reading queue infomation</p>

                ))}

            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Manage);
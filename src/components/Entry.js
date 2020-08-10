import React from 'react';
import logo from '../img/queue_sample.png';
import sync from '../img/sync.png';
import './Common.css';
import axios from 'axios';
import firebase from '../Firebase';
import { withRouter } from 'react-router';

class Entry extends React.Component {

  constructor() {
    super();
    this.state = {
      entry_list: null,
      msg: null,
    }
  }

  componentDidMount() {
    this.updateQueue();
  }

  updateQueue() {

    firebase.auth().currentUser.getIdToken(true).then(token => {
      return axios.get('http://133.242.50.211/api/check', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then(res => {
      var status = res.data['status'];
      console.log('/api/chec', res.data);
      if (status === 'OK') {
        this.setState(Object.assign(this.state, {
          entry_list: res.data['list'],
        }));
      } else {
        this.setState(Object.assign(this.state, {
          msg: res.data['msg'],
        }))
      }
    }).catch(err => {
      console.log('/api/check', err);
    })
  }



  onSelect(entry) {
    console.log(entry);
    this.props.history.push(`/app/wait?id=${entry.id}`);

  }

  render() {
    return (
      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h3>Your Entry</h3>
            </div>
          </div>
        </div>
        <div className="Content-container">
          <div className="Main-frame">

            <img className="Button sync" src={sync} alt="update status" onClick={this.updateQueue.bind(this)}></img>
            <p>All the queues in which<br /> you are waiting now</p>
            {this.state.entry_list ? (

              <table className="Table entry">
                <thead>
                  <tr>
                    <th>Queue Name</th>
                    <th>Sign Name</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.entry_list.map((data, i) => {
                    return (
                      <tr className="Table-item" key={i} >
                        <td className="Table-cell">{data.queue_name}</td>
                        <td className="Table-cell">{data.entry.name}</td>
                        <td className="Table-cell">{data.entry.time}</td>
                        <td className="Table-cell action">

                          <button className="Button dequeue" onClick={this.onSelect.bind(this, data.entry)}>Select</button>

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            ) : (this.state.msg ? (
              <p>{this.state.msg}</p>
            ) : (
                <p>reading queue infomation</p>
              )
              )}
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Entry);
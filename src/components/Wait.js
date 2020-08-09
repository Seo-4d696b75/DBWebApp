import React from 'react';
import logo from '../img/queue_sample.png';
import party from '../img/party_parrot.gif';
import sync from '../img/sync.png';
import './Common.css';
import Auth from './Auth';
import firebase from '../Firebase';
import axios from 'axios';
import {withRouter} from 'react-router';

class Wait extends React.Component {

  constructor(){
    super();
    this.state = {
      status: 'init',
      queue: null,
      position: null,
      wait_size: 0
    };
  }

  componentDidMount(){
    this.updateStatus();
  }
  
  updateStatus(){
    
    console.log("update status");
    axios.get(`http://133.242.50.211/api/wait?id=${this.props.query.id}`).then( res => {
      console.log('/api/wait', res.data);
      if ( res.data['status'] === 'OK' ){
        this.setState({
          status: 'wait',
          queue: res.data['queue'],
          position: res.data['entry'],
          wait_size: res.data['wait_size']
        }); 
      }else {
        console.log(`Fail to get your position.${res.data['msg']}`);
        this.setState({
          status: 'err',
          msg: res.data['msg'],
        });
      }
    }).catch( err => {
        console.log('/api/wait', err);
    })
  }

  cancel(){
    if ( !this.state.queue ) return;
    if ( this.state.status !== 'cancel' ){
      this.setState(Object.assign(this.state, {
        status: 'cancel'
      }));
      return;
    }
    
    console.log('cancel');
    firebase.auth().currentUser.getIdToken(true).then( token =>{
      return axios.get(`http://133.242.50.211/api/cancel?id=${this.state.position.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then( res => {
      console.log('/api/cancel', res.data);
      if ( res.data['status'] === 'OK' ){
        alert(`Success to cancel.\nQueue: ${this.state.queue.name}\nYour Name: ${this.state.position.name}`);
        this.props.history.push("/");

      }else {
        alert(`Fail to cencel.\nQueue: ${this.state.queue.name}\nMessage: ${res.data['msg']}`);
      }
    }).catch( err => {
        console.log('/api/cancel', err);
    })
  }

  render() {
    var child = (

      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h3>Your Position</h3>
            </div>
          </div>
        </div>
        <div className="Main-frame">
          <div className="Scroll-container">
            <img className="Button sync" src={sync} alt="update status" onClick={this.updateStatus.bind(this)}></img>
            {this.state.status === 'wait' ? (
                <div style={{width: "100%", margin: 0, padding: 0}}>
                    
                  {this.state.position.wait ? (
                    <div className="Counter-container">
                      <div className="Counter-msg">Number of remains</div>
                      <div className="Counter-value">{this.state.wait_size}</div>
                    </div>
                  ) : (
                      <img className="Party" src={party} alt="Now It's Your Turn! Party!!"/>
                  )}
                  <div className="Counter-container">
                    <div className="Counter-status">{this.state.position.wait ? 'Waiting' : "Now It's Your Turn!"}</div>
                  </div>
                  <table className="Table position">
                    <tbody>
                      <tr>
                        <td>Your Name : </td>
                        <td>{this.state.position.name}</td>
                      </tr>
                      <tr>
                        <td>Join Time : </td>
                        <td>{this.state.position.time}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="Queue-details"></div>
                  <h2>{this.state.queue.name}</h2>
                  <p>Created at {this.state.queue.time}</p>
                  <p>{this.state.queue.description}</p>

                  {this.state.position.wait ? (
                    <button className="Button cancel" onClick={this.cancel.bind(this)}>Cancel</button>
                  ) : null }
                </div>
            ) : ( this.state.status === 'err' ? (
              <div>
                <h2>Not Found</h2>
                
                <p>error message: {this.state.msg}</p>
              </div>
            ) : ( this.state.status === 'cancel' ? (
              <div>
                <p>Are you sure to cancel?</p>
                <button className="Button cancel" onClick={this.cancel.bind(this)}>Cancel</button>
              </div>
            ) : (
              <p>reading infomation</p>
            )
              
            ))}
          </div>
        </div>
      </div>
    );
    return this.state.status === 'cancel' ? (
      <Auth>
        {child}
      </Auth>
    ) : child;
  }

}

export default withRouter(Wait);
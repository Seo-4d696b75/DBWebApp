import React from 'react';
import logo from '../img/queue_sample.png';
import party from '../img/party_parrot.gif';
import sync from '../img/sync.png';
import './Common.css';
import axios from 'axios';
import {withRouter} from 'react-router';

class Wait extends React.Component {

  constructor(){
    super();
    this.state = {
      status: 'init',
      queue: null,
      position: null,
    };
  }

  componentDidMount(){
    this.updateStatus();
  }
  
  updateStatus(){
    
    const query = {
      id: this.props.query.id,
      index: this.props.query.index,
    }
    console.log("update status",query);
    axios.get('http://133.242.50.211/api/wait', {params: query}).then( res => {
      if ( res.data['status'] === 'OK' ){
        this.setState({
          status: 'success',
          queue: res.data['queue'],
          position: res.data,
        }); 
      }else {
        console.log(`Fail to get your position.${res.data['msg']}`);
        this.setState({
          status: 'err',
          query: query,
          msg: res.data['msg'],
        });
      }
    }).catch( err => {
        console.log('join', err);
    })
  }

  cancel(){
    if ( !this.state.queue ) return;
    
    console.log('cancel');
    const query = {
      id: this.state.queue.id,
      index: this.state.position.index,
    }
    axios.get('http://133.242.50.211/api/cancel', {params: query}).then( res => {
      if ( res.data['status'] === 'OK' ){
        alert(`Success to cancel.\nQueue: ${this.state.queue.name}\nYour Name: ${this.state.position.name}`);
        this.props.history.push("/");

      }else {
        alert(`Fail to cencel.\nQueue:${this.state.queue.name}`);
      }
    }).catch( err => {
        console.log('cancel', err);
    })
  }

  render() {
    return (

      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h2>Your Position</h2>
            </div>
          </div>
        </div>
        <div className="Main-frame">
          <div className="Scroll-container">
            <img className="Button sync" src={sync} alt="update status" onClick={this.updateStatus.bind(this)}></img>
            {this.state.status === 'success' ? (
                <div>
                    
                  {this.state.position.wait ? (
                    <div className="Counter-container">
                      <div className="Counter-msg">Number of remains</div>
                      <div className="Counter-value">{this.state.position.wait_size}</div>
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
            ) : ( 
              <p>reading infomation</p>
            ))}
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Wait);
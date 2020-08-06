import React from 'react';
import logo from '../img/queue_sample.png';
import './Common.css';
import axios from 'axios';
import {withRouter} from 'react-router';

class Enqueue extends React.Component {

  constructor(){
    super();
    this.state = {
      queue: null,
      user_name: '',
    };
  }

  componentDidMount(){
    console.log('query', this.props.query);
    axios.get('http://133.242.50.211/api/list', {params: {id: this.props.query.id}}).then( res => {
      if ( res.data['status'] === 'OK' ){
        this.setState(
          Object.assign(this.state, {queue: res.data['list'][0]})  
        );
      }
    });
  }

  onJoin(){
    console.log('join', this.state.queue.id, this.state.user_name);
    
    var query = {
      id: this.state.queue.id,
      name: this.state.user_name,
    };
    axios.get('http://133.242.50.211/api/enqueue', {params: query}).then( res => {
      console.log('api/enqueue', res.data);
      if ( res.data['status'] === 'OK' ){
        var index = res.data['index'];
        this.props.history.push(`/app/wait?id=${this.state.queue.id}&index=${index}`);
      } else {
        alert(`Fail to join this queue.\n${res.data['msg']}`);
      }
    }).catch( err => {
      console.log('/api/enqueue', err);
    })
  }

  onUserNameChanged(event){
    this.setState(Object.assign(this.state, {
      user_name: event.target.value,
    }))
  }

  render() {
    return (

      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h2>Join Queue</h2>
            </div>
          </div>
        </div>
        <div className="Main-frame">
          <div className="Scroll-container">
            {this.state.queue ? (
                <div>
                  <h2>{this.state.queue.name}</h2>
                  <h4>Created at {this.state.queue.time}</h4>
                  <p>{this.state.queue.description}</p>
                  <div>
                    Your Name: <input 
                    type='text' 
                    required minLength='3' maxLength='40'
                    value={this.state.user_name}
                    onChange={this.onUserNameChanged.bind(this)}/>
                  </div>
                  <button className="Button join" onClick={this.onJoin.bind(this)}>JOIN</button>
                </div>
            ) : (
              <p>reading queue infomation</p>
            )}
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Enqueue);
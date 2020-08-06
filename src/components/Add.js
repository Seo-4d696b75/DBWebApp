import React from 'react';
import logo from '../img/queue_sample.png';
import './Common.css';
import axios from 'axios';
import {withRouter} from 'react-router';

class Add extends React.Component {

  constructor(){
    super();
    this.state = {
      name: '',
      description: '',
    };
  }


  onAdd(){
    console.log('add', this.state.name, this.state.description);
    
    var data = {
      name: this.state.name,
      description: this.state.description,
    };
    axios.post('http://133.242.50.211/api/add', data).then( res => {
      console.log('api/add/', res.data);
      if ( res.data['status'] === 'OK' ){
        var id = res.data['id']
        this.props.history.push(`/app/manage?id=${id}`);
      } else {
        alert(`Fail to create queue.\n${res.data['msg']}`);
      }
    }).catch( err => {
      console.log('/api/add', err);
    })
  }

  onNameChanged(event){
    this.setState(Object.assign(this.state, {
      name: event.target.value,
    }))
  }

  onDescriptionChanged(event){
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
              <h2>Create Queue</h2>
            </div>
          </div>
        </div>
        <div className="Main-frame">
          <div className="Scroll-container">
                  <h4>Fill in information of queue</h4>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name </td>
                        <td><input className="Input-text queue-name"
                            type='text' 
                            maxLength='40'
                            value={this.state.name}
                            onChange={this.onNameChanged.bind(this)}/>
                        </td>
                      </tr>
                      <tr>
                        <td>Description </td>
                        <td><input className="Input-text description"
                          type='text' 
                          value={this.state.description}
                          onChange={this.onDescriptionChanged.bind(this)}/></td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="Button create" onClick={this.onAdd.bind(this)}>Create</button>
                
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Add);
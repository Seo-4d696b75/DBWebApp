import React from 'react';
import logo from '../img/queue_sample.png';
import './Common.css';
import Auth from './Auth';
import axios from 'axios';
import qr from '../img/qr.png';
import firebase from '../Firebase';
import { withRouter } from 'react-router';
import QRCode from 'qrcode';

class Queue extends React.Component {

  constructor() {
    super();
    this.state = {
      queue: null,
      enqueue: false,
      user_name: '',
      qr_code: false,
    };
    this.canvas_ref = React.createRef();
  }

  componentDidMount() {
    console.log('query', this.props.query);
    axios.get(`http://133.242.50.211/api/queue?id=${this.props.query.id}`).then(res => {
      console.log('/api/queue', res);
      if (res.data['status'] === 'OK') {
        this.setState(
          Object.assign(this.state, {
            queue: res.data['queue'],
          })
        );
        if (this.props.query.qr && this.props.query.qr === 'true') this.showQRCode();
      }
    }).catch(err => {
      console.log('/api/queue', err);
    });
  }

  onJoin() {
    if (!this.state.enqueue) {
      this.setState(Object.assign(this.state, {
        enqueue: true,
        qr_code: false,
      }));
      return;
    }
    console.log('join', this.state.queue.id, this.state.user_name);

    var query = {
      id: this.state.queue.id,
      name: this.state.user_name,
    };
    firebase.auth().currentUser.getIdToken(true).then(token => {
      return axios.get('http://133.242.50.211/api/enqueue', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then(res => {
      console.log('api/enqueue', res.data);
      if (res.data['status'] === 'OK') {
        this.props.history.push(`/app/wait?id=${res.data['entry_id']}`);
      } else {
        alert(`Fail to join this queue.\n${res.data['msg']}`);
      }
    }).catch(err => {
      console.log('/api/enqueue', err);
    })
  }

  showQRCode() {
    if (this.state.qr_code) return;
    this.setState(Object.assign(this.state, { qr_code: true }));

    const text = `http://133.242.50.211/app/queue?id=${this.props.query.id}`;
    console.log('QR code', text);
    new Promise((res, rej) => {
      const canvas = new OffscreenCanvas(1, 1);
      QRCode.toCanvas(canvas, text, err => {
        if (err) {
          rej(err);
        } else {
          res(canvas);
        }
      });
    }).then(canvas => {
      this.canvas_ref.current.getContext("bitmaprenderer").transferFromImageBitmap(canvas.transferToImageBitmap());
    }).catch(err => {
      console.log('QRCode', err);
    })
  }

  onUserNameChanged(event) {
    this.setState(Object.assign(this.state, {
      user_name: event.target.value,
    }))
  }

  render() {
    var child = (

      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h3>Join Queue</h3>
            </div>
          </div>
        </div>
        <div className="Content-container">
          <div className="Main-frame">
            <div className="Scroll-container">
              {this.state.queue ? (
                <div>
                  <h3>{this.state.queue.name}</h3>
                  {this.state.qr_code ? (
                    <canvas className="QR-canvas" ref={this.canvas_ref}></canvas>
                  ) : null}
                  <h4>Created by {this.state.queue.creator}<br /> at {this.state.queue.time}</h4>
                  <p>{this.state.queue.description}</p>
                  {this.state.enqueue ? (
                    <div>
                      Your Name: <input
                        type='text'
                        required minLength='3' maxLength='40'
                        value={this.state.user_name}
                        onChange={this.onUserNameChanged.bind(this)} />
                    </div>
                  ) : null}
                  {this.state.qr_code ? null : (
                    <img className="Button qr" src={qr} alt="show QR code" onClick={this.showQRCode.bind(this)}></img>
                  )}
                  <button className="Button join" onClick={this.onJoin.bind(this)}>JOIN</button>
                </div>
              ) : (
                  <p>reading queue infomation</p>
                )}
            </div>
          </div>
        </div>
      </div>
    );
    return this.state.enqueue ? (
      <Auth>
        {child}
      </Auth>
    ) : child;
  }

}

export default withRouter(Queue);
import React from 'react';
import firebase from '../Firebase';
import Signin from './SignIn';
import './Common.css';
import sign_out from '../img/sign_out.png';
import LoadingOverlay from 'react-loading-overlay';
import {withRouter} from 'react-router';

class Auth extends React.Component {

  constructor(){
    super();
    this.state = {
      signin_checked: false,
      signed_in: false,
      user: null,
    };
    this.is_mounted = false;
  }

  componentDidMount(){
    this.is_mounted = true;
    firebase.auth().onAuthStateChanged( user => {
      console.log('auth state changed', user);
      if ( this.is_mounted ){
        if ( user ){
          this.setState({signin_checked:true, signed_in:true, user:user,});
        } else {
          this.setState({signin_checked:true, signed_in:false, user:null,});
        }
      }
    })
  }

  componentWillUnmount(){
    this.is_mounted = false;
  }

  onSignOut(){
    firebase.auth().signOut().then( res =>{
      console.log("sign out", res);
    }).catch( err => {
      console.log(err);
      alert("Fail to sign out.");
    })

  }

  render(){
    // already checked?
    if ( !this.state.signin_checked ){
      return(
        <LoadingOverlay
          active={true} spinner text="Now Loading...">
          <div style={{ height: '100vh', width: '100vw' }}></div>
        </LoadingOverlay>
      )
    }

    // singed in ?
    if ( this.state.signed_in ){
      return (
        <div className="Root-container">
          <div className="Account-container">
            <div className="Account-name">{this.state.user.displayName}</div>
            <div className="Account-frame">

              <img className="Img account" src={this.state.user.photoURL} alt=""></img>
              <img className="Button sign-out" src={sign_out} alt="sign out" onClick={this.onSignOut.bind(this)}></img>
            </div>
          </div>
          {this.props.children}
        </div>
      )
    } else {
      return <Signin></Signin>
    }
  }

}

export default withRouter(Auth);
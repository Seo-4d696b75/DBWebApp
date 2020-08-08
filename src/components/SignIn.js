import React from 'react';
import logo from '../img/queue_sample.png';
import { withRouter } from 'react-router-dom'
import firebase, {providerGoogle, providerTwitter} from '../Firebase';
import './firebaseui.css';
import sing_out from '../img/sign_out.png';

class SignIn extends React.Component {

  constructor(){
    super();
    this.state = {
      loading: false,
    }
    this.is_mounted = false;
  }

  signinTwitter(){
    firebase.auth().signInWithRedirect(providerTwitter);
    firebase.auth().getRedirectResult().then( result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  }

  signinGoogle(){

    firebase.auth().signInWithRedirect(providerGoogle);
    firebase.auth().getRedirectResult().then( result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  }
  componentDidMount() {
    this.is_mounted = true;
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  gotoHome(){
    
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h2>Sign In</h2>
            </div>
          </div>
        </div>
        <div className="Main-frame">
          <div className="Scroll-container">
            <p>Select Your Account</p>
            <form>
              <ul className="firebaseui-idp-list">
                <li className="firebaseui-list-item">
                  <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" data-provider-id="google.com" style={{'backgroundColor':'#ffffff'}} onClick={this.signinGoogle.bind(this)} data-upgraded=",MaterialButton">
                    <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"/></span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-short">Google</span>
                  </button>
                </li>
                <li className="firebaseui-list-item">
                  <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button" data-provider-id="facebook.com" style={{"backgroundColor":"#3b5998"}} data-upgraded=",MaterialButton">
                    <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"/></span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Facebook</span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-short">Facebook</span>
                  </button>
                </li>
                <li className="firebaseui-list-item">
                  <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-twitter firebaseui-id-idp-button" data-provider-id="twitter.com" style={{"backgroundColor":"#55acee"}} onClick={this.signinTwitter.bind(this)} data-upgraded=",MaterialButton">
                    <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg"/></span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Twitter</span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-short">Twitter</span>
                  </button>
                </li>
                <li className="firebaseui-list-item">
                  <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" style={{"backgroundColor":"#FFFFFF","marginTop":"20px",}} onClick={this.gotoHome.bind(this)} data-upgraded=",MaterialButton">
                    <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src={sing_out}/></span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-long">Cancel and Go Home</span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-short">Cancel</span>
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
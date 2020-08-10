import React from 'react';
import logo from '../img/queue_sample.png';
import key from '../img/key.png'
import { withRouter } from 'react-router-dom'
import firebase, { providerGoogle, providerTwitter } from '../Firebase';
import './firebaseui.css';
import sing_out from '../img/sign_out.png';

import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

class SignIn extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      signin_email: false,
    }
    this.is_mounted = false;
  }

  signinTwitter() {
    firebase.auth().signInWithRedirect(providerTwitter);
    firebase.auth().getRedirectResult().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  }

  signinGoogle() {

    firebase.auth().signInWithRedirect(providerGoogle);
    firebase.auth().getRedirectResult().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  }

  signinMail(values) {
    console.log(values);
    if (this.is_mounted) {
      this.setState(Object.assign(this.state, { loading: true }));
    }

    firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(res => {
      if (this.is_mounted) this.setState(Object.assign(this.state, { loading: false }));
    }).catch(err => {
      if (this.is_mounted) this.setState(Object.assign(this.state, { loading: false }));
      alert(err);
    });
  }

  componentDidMount() {
    this.is_mounted = true;
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  gotoHome() {

    this.props.history.push('/');
  }

  render() {
    return (
      <div className="Root-container">
        <div className="Header-container">
          <div className="Header-frame">
            <img src={logo} className="Queue-logo" alt="logo" />
            <div className="Header-title">
              <h3>Sign In</h3>
            </div>
          </div>
        </div>
        <div className="Content-container">
          <div className="Main-frame">
            <div className="Scroll-container">
              <p>{this.state.signin_email ? "Developer Only" : "Select Your Account"}</p>
              {this.state.signin_email ? (
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={(values) => this.signinMail(values)}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email().required(),
                    password: Yup.string().required(),
                  })}
                >
                  {
                    ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.email && errors.email ? true : false}
                          />
                          <FormFeedback>
                            {errors.email}
                          </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.password && errors.password ? true : false}
                          />
                          <FormFeedback>
                            {errors.password}
                          </FormFeedback>
                        </FormGroup>
                        <div style={{ textAlign: 'center' }}>
                          <Button color="primary" type="submit" disabled={this.state.loading}>
                            <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading} />
                                            Sigin In
                                        </Button>
                        </div>
                      </Form>
                    )
                  }
                </Formik>
              ) : (

                  <form>
                    <ul className="firebaseui-idp-list">
                      <li className="firebaseui-list-item">
                        <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" data-provider-id="google.com" style={{ 'backgroundColor': '#ffffff' }} onClick={this.signinGoogle.bind(this)} data-upgraded=",MaterialButton">
                          <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" /></span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-short">Google</span>
                        </button>
                      </li>
                      <li className="firebaseui-list-item">
                        <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-twitter firebaseui-id-idp-button" data-provider-id="twitter.com" style={{ "backgroundColor": "#55acee" }} onClick={this.signinTwitter.bind(this)} data-upgraded=",MaterialButton">
                          <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg" /></span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Twitter</span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-short">Twitter</span>
                        </button>
                      </li>
                      <li className="firebaseui-list-item">
                        <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-github firebaseui-id-idp-button" data-provider-id="" style={{ "backgroundColor": "#A0A0A0" }} onClick={() => { this.setState(Object.assign(this.state, { signin_email: true })) }} data-upgraded=",MaterialButton">
                          <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src={key} /></span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in as Developer</span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-short">Developer</span>
                        </button>
                      </li>
                      <li className="firebaseui-list-item">
                        <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" style={{ "backgroundColor": "#FFFFFF", "marginTop": "20px", }} onClick={this.gotoHome.bind(this)} data-upgraded=",MaterialButton">
                          <span className="firebaseui-idp-icon-wrapper"><img className="firebaseui-idp-icon" alt="" src={sing_out} /></span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-long">Cancel and Go Home</span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-short">Cancel</span>
                        </button>
                      </li>
                    </ul>
                  </form>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
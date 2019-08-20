import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
import './App.css';
import logo from './white-logo.png';
import { login, createUserAccount } from 'simpleid-js-sdk';
import signupButton from './hellosignup.png';
import signinButton from './hellosignin.png';
import BlockstackPage from './BlockstackPage';
import EthereumPage from './EthereumPage';
import PinataPage from './IPFSPage';
const {simpleIDKeys} = require('./keys');
const appObj = { 
  appOrigin: window.location.origin, 
  scopes: ['store_write', 'publish_data'], 
  apiKey: simpleIDKeys().apiKey, 
  devId: simpleIDKeys().devId, 
  development: false
}
const appConfig = new AppConfig(appObj.scopes);
const userSession = new UserSession({ appConfig });
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: {}, 
      signedin: false, 
      content: "",
      activeClass: "signin",
      pending: false, 
      page: "blockstack"
    }
  }

  loginForm = () => {
    this.setState({ activeClass: "signin" });
    document.getElementById('log-in').style.display = "block";
    document.getElementById('sign-up').style.display = "none";
  }
  
  signupForm = () => {
    this.setState({ activeClass: "signup" });
    document.getElementById('log-in').style.display = "none";
    document.getElementById('sign-up').style.display = "block";
  }
  
  handleSignUp = async (e) => {
    e.preventDefault();
    document.getElementById('name-error').style.display = "none";
    this.setState({ pending: true });
    const credObj = {
      id: document.getElementById('username-input-sign-up').value,
      password: document.getElementById('password-input-sign-up').value,
      email: document.getElementById('email-input-sign-up').value,
      hubUrl: "https://hub.blockstack.org"
    }
    const signup = await createUserAccount(credObj, appObj)
    console.log(signup);
    if(signup.message === "name taken") {
      this.setState({ pending: false });
      await this.signupForm();
      document.getElementById('name-error').style.display = "block";
    } else {
      localStorage.setItem('blockstack-session', JSON.stringify(signup.body.store.sessionData));
      if(signup.message === "Need to go through recovery flow") {
        document.getElementById('log-in-recovery').style.display = "block";
      } else if(signup.message === "user session created") {
        this.setState({ userSession: signup.body, signedin: true, pending: false });
      } else {
        this.setState({ pending: false });
        document.getElementById('growl').style.display = "block";
        document.getElementById('growl-p').innerText = "Trouble signing up";
        setTimeout(() => {
          document.getElementById('growl').style.display = "none";
          document.getElementById('growl-p').innerText = "";
        }, 2000)
        console.log(signup);
      }
    }
  }
  
  handleLogIn = async(e) => {
    e.preventDefault();
    document.getElementById('name-error').style.display = "none";
    this.setState({ pending: true });
    const credObj = {
      id: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value,
      hubUrl: "https://hub.blockstack.org"
    }
    const params = {
      credObj,
      appObj
    }
    const signin = await login(params);
    if(signin.message === "Need to go through recovery flow") {
      this.setState({ pending: false });
      document.getElementById('log-in-recovery').style.display = "block";
    } else if(signin.message === "user session created") {
      localStorage.setItem('blockstack-session', JSON.stringify(signin.body.store.sessionData));
      const appConfig = new AppConfig(appObj.scopes);
      const userSession = new UserSession({ appConfig });
      this.setState({ userSession, signedin: true, pending: false });
    } else if(signin.message === "invalid password") {
      this.setState({ pending: false });
      document.getElementById('growl').style.display = "block";
      document.getElementById('growl-p').innerText = "Invalid password";
      setTimeout(() => {
        document.getElementById('growl').style.display = "none";
        document.getElementById('growl-p').innerText = "";
      }, 2000)
    } else {
      this.setState({ pending: false });
      document.getElementById('growl').style.display = "block";
      document.getElementById('growl-p').innerText = "Trouble signing in";
      setTimeout(() => {
        document.getElementById('growl').style.display = "none";
        document.getElementById('growl-p').innerText = "";
      }, 2000)
      console.log(signin);
    }
  }

  signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('blockstack-session');
    window.location.reload();
  }

  renderFooter() {
    return (
      <footer className="footer">
        <img src={logo} alt="simpleid" />
      </footer>
    )
  }
  render() {
    console.log(simpleIDKeys());
    const { activeClass, pending, content, page } = this.state;
    const activeTab = {
      background: "#fff", 
      color: "#809eff"
    };
    const inactiveTab = {
      background: "#809eff", 
      color: "#fff"
    }
    if(userSession.isUserSignedIn()) {
      return (
        <div style={{paddingTop: "100px"}} className="wrapper">
          <div style={{display: "none"}} id="dimmer"></div>
          <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>
          <div className="container">
          <div className="tabs">
            <ul style={{position: "relative", zIndex: "999"}}>
              <li style={page === "blockstack" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "blockstack" })}>Blockstack Example</li>
              <li style={page === "ethereum" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ethereum" })}>Ethereum Example</li>
              <li style={page === "ipfs" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ipfs" })}>IPFS Example</li>
            </ul>
          </div>
          <div className="card">
            {
              page === "blockstack" ? 
              <BlockstackPage 
                userSession={userSession}
                content={content}
                signOut={this.signOut}
              /> : 
              page === 'ethereum' ? 
              <EthereumPage 
                userSession={userSession}
                signOut={this.signOut}
              /> : 
              page === "ipfs" ? 
              <PinataPage 
                userSession={userSession}
                signOut={this.signOut}
              /> : 
              <div />
            }
          </div>
          {this.renderFooter()}
          </div>
          <ul className="bg-bubbles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
        </div>
      );
    } else if(pending) {
      return (
        <div>
          <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>
          <div className="wrapper">
            <div className="container">
              <h1>Just a moment...</h1>
            </div>
            <ul className="bg-bubbles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            {this.renderFooter()}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>
          <div className="wrapper">
                <ul className="options" style={{listStyle: "none"}}>
                  <li style={{display: "inline", cursor: "pointer"}} onClick={this.loginForm} className={activeClass === "signin" ? "active" : ""}>Sign In</li>
                  <li style={{display: "inline", cursor: "pointer"}} onClick={this.signupForm} className={activeClass === "signup" ? "active" : ""}>Sign Up</li>
                </ul>
              <div id="log-in" className="container">
                <h1>Welcome, please sign in</h1>
                
                <form className="form">
                  <input id="username-input" type="text" placeholder="Username"/>
                  <label style={{color: "#fff"}}>Username</label>
                  <input id="password-input" type="password" placeholder="Password"/>
                  <label style={{color: "#fff"}}>Password</label><br/>
                  <div style={{display: "none", margin: "15px", fontWeight: "600"}} id="log-in-recovery">
                    <h4>Looks like this is a new device or it's been a while since you logged in. You'll have to enter your email address as well to log in.</h4>
                    <input style={{marginTop: "15px"}} id="email-input" type="email" placeholder="Email"/>
                  </div>
                  <button onClick={this.handleLogIn} type="submit" id="login-button" className="link-button"><img className="auth-button" src={signinButton} alt="login" /></button>
                </form>
              </div>

              <div style={{display: "none"}} id="sign-up" className="container">
                <h1>Welcome, please sign up</h1>
                
                <form className="form">
                  <span style={{display: "none"}} id="name-error">Sorry, that name is taken. Try another!</span>
                  <input id="username-input-sign-up" type="text" placeholder="Username"/>
                  <label style={{color: "#fff"}}>Username</label>
                  <input id="password-input-sign-up" type="password" placeholder="Password"/>
                  <label style={{color: "#fff"}}>Password</label>
                  <input id="email-input-sign-up" type="email" placeholder="Email"/>
                  <label style={{color: "#fff"}}>Email</label><br/>
                  <button onClick={this.handleSignUp} type="submit" id="login-button" className="link-button"><img className="auth-button" src={signupButton} alt="sign up" /></button>
                </form>
              </div>
              {this.renderFooter()}
            </div>
            
            <ul className="bg-bubbles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            
          </div>
      );
    }
  }
}

export default App;

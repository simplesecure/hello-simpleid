import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
import './App.css';
import logo from './white-logo.png';
//import { login, createUserAccount } from 'simpleid-js-sdk';
import signupButton from './hellosignup.png';
import signinButton from './hellosignin.png';
import BlockstackPage from './BlockstackPage';
import EthereumPage from './EthereumPage';
import EthereumTodoPage from './EthereumTodoPage';
import PinataPage from './IPFSPage';
import BarLoader from 'react-spinners/BarLoader';
import SimpleID from 'simpleid-js-sdk';
const {simpleIDKeys} = require('./keys');
const simple = new SimpleID({
  appOrigin: "https://app.graphitedocs.com",
  scopes: ['store_write', 'publish_data'],
  apiKey: "123456",
  devId: "justin.email.email@email.com",
  appName: "Graphite", 
  development: true, 
  network: 'layer2', 
  localRPCServer: 'http://localhost:7545'
});
const appObj = {
  appOrigin: window.location.origin,
  scopes: ['store_write', 'publish_data'],
  apiKey: process.env.NODE_ENV === "production" ? simpleIDKeys().apiKey : "-LmCb96-TquOlN37LpM0",
  devId: process.env.NODE_ENV === "production" ? simpleIDKeys().devId : "imanewdeveloper",
  development: process.env.NODE_ENV === "production" ? false : true
}
const appConfig = new AppConfig(appObj.scopes);
const userSession = new UserSession({ appConfig });

const GROWL_DISPLAY_STYLE = 'flex'
const GROWL_DELAY = 5000 // ms

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: {},
      signedin: false,
      content: "",
      activeClass: "signup",
      pending: false,
      page: "ethereumTodo",
      loadingMessage: "",
    }
  }

  loginForm = () => {
    this.setState({ activeClass: "signin" });
    document.getElementById('log-in').style.display = "block";
    document.getElementById('sign-up').style.display = "none";
    document.getElementById('error-sign-in-fields').style.display = "none";
  }

  signupForm = () => {
    this.setState({ activeClass: "signup" });
    document.getElementById('log-in').style.display = "none";
    document.getElementById('sign-up').style.display = "block";
    document.getElementById('error-sign-up-fields').style.display = "none";
  }

  statusCallbackFn = (aStatusMessage) => {
    this.setState( { pending:true, loadingMessage:aStatusMessage } )
  }


  handleSignUp = async (e, code) => {
    e.preventDefault();
    document.getElementById('name-error').style.display = "none";
    document.getElementById('error-sign-up-fields').style.display = "none";

    const credObj = {
      id: document.getElementById('username-input-sign-up').value,
      password: document.getElementById('password-input-sign-up').value,
      email: document.getElementById('email-input-sign-up').value,
      hubUrl: "https://hub.blockstack.org"
    }

    // Error check
    let error = false
    if (!credObj.id) {
      document.getElementById('error-sign-up-fields').style.display = "block";
      error = true
    }
    if (error) {
      return
    }

    this.setState({ pending: true });

    const options = {
       statusCallbackFn: this.statusCallbackFn,
       passwordless: true
    }
    //const signup = await createUserAccount(credObj, appObj, options)
    const payload = { email: credObj.email};
    const signup = await simple.authenticate(payload);
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
        document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
        document.getElementById('growl-p').innerText = "Trouble signing up";
        setTimeout(() => {
          document.getElementById('growl').style.display = "none";
          document.getElementById('growl-p').innerText = "";
        }, GROWL_DELAY)
        console.log(signup);
      }
    }
  }

  handleLoginWithCode = async(e, email, code) => {
    const payload = { email: email, token: code};
    const signup = await simple.authenticate(payload);
  }

  handleLogIn = async(e) => {
    e.preventDefault();
    document.getElementById('name-error').style.display = "none";
    document.getElementById('error-sign-in-fields').style.display = "none";

    const credObj = {
      id: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value,
      hubUrl: "https://hub.blockstack.org"
    }

    // Error check
    let error = false
    if (!credObj.id) {
      document.getElementById('error-sign-in-fields').style.display = "block";
      error = true
    }
    if (error) {
      return
    }
    this.setState({ pending: true });

    const params = {
      credObj,
      appObj
    }
    const signin = {}//await login(params);

    if(signin.message === "Need to go through recovery flow") {
      this.setState({ pending: false });
      document.getElementById('log-in-recovery').style.display = "block";
    } else if(signin.message === "user session created") {
      localStorage.setItem('blockstack-session', JSON.stringify(signin.body.store.sessionData));
      const appConfig = new AppConfig(appObj.scopes);
      const userSession = new UserSession({ appConfig });
      this.setState({ userSession, signedin: true, pending: false });
    } else if (signin.message === "invalid password" ||
               signin.message === "error creating app keys") {
      this.setState({ pending: false });
      document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
      document.getElementById('growl-p').innerText = "Invalid password";
      setTimeout(() => {
        document.getElementById('growl').style.display = "none";
        document.getElementById('growl-p').innerText = "";
      }, GROWL_DELAY)
    } else {
      this.setState({ pending: false });
      document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
      document.getElementById('growl-p').innerText = "Trouble signing in";
      setTimeout(() => {
        document.getElementById('growl').style.display = "none";
        document.getElementById('growl-p').innerText = "";
      }, GROWL_DELAY)
      console.log(signin);
    }
  }

  signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('blockstack-session');
    window.location.reload();
  }

  renderBanner(isSignedIn=false) {
    const signOutButton = isSignedIn ?
      ( <button
          style={{width:'auto', margin:'auto 0px auto auto'}}
          className="on-white"
          onClick={this.signOut}>Sign Out</button> ) : undefined

    return (
      <div className="banner">
        <img src={logo} alt="simpleid" />
        {signOutButton}
      </div>
    )
  }

  renderFooter() {
    return (
      <div id="footer">
        <h3 style={{fontWeight:'bold'}}>Add SimpleID to your App, free <a href="https://app.simpleid.xyz/?t=demo_app" target="_blank" rel="noreferrer noopener">here</a>.</h3>
      </div>
    )
  }

  getPage = (aPageName, theUserSession, theContent) => {
    switch (aPageName) {
      case 'blockstack':
        return (
          <BlockstackPage
            userSession={theUserSession} content={theContent}/> )
        break;
      case 'ipfs':
        return (
          <PinataPage userSession={theUserSession}/> )
        break;
      case 'ethereum':
        // return (
        //   <EthereumPage userSession={theUserSession}/> )
        // break;
      case 'ethereumTodo':
        return (
          <EthereumTodoPage userSession={theUserSession}/> )
      default:
        return ( <div /> )
    }
  }

  render() {
    //console.log(simpleIDKeys());
    let { activeClass, pending, content, page, loadingMessage } = this.state;

    const activeTab = {
      background: "#fff",
      color: "#809eff",
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#dadada',
      borderBottomColor: '#fff',
      marginBottom: -1
    };
    const inactiveTab = {
      background: "#809eff",
      color: "#fff",
    }
    if(userSession.isUserSignedIn()) {
      return (
        <div className="wrapper">
          {this.renderBanner(true)}

          <div style={{display: "none"}} id="dimmer"></div>
          <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>

          <div className="container" style={{flex:'none', paddingTop:0}}>
            <h4 style={{color: "#fff"}}>Signed-in as {userSession.loadUserData().username}</h4>
          </div>

          <div className="container">
            <div className="tabs">
              <ul style={{position: "relative", zIndex: "999"}}>
                <li style={page === "ethereumTodo" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ethereumTodo" })}>Ethereum</li>
                {/*<li style={page === "ethereum" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ethereum" })}>Ethereum Example</li>*/}
                <li style={page === "ipfs" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ipfs" })}>IPFS</li>
                <li style={page === "blockstack" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "blockstack" })}>Blockstack</li>
              </ul>
            </div>
            <div className="card">{this.getPage(page, userSession, content)}</div>
          </div>

          {this.renderFooter()}
        </div>
      );
    } else if(pending) {
      return (
        <div className="wrapper">
          {this.renderBanner()}

          <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>

          <div className="container">
            <h1>Just a moment...</h1>
            <h2 style={{fontStyle:'italic'}}>{loadingMessage}</h2>
            <div style={{display:"inline-block", margin:"auto"}}>
              <BarLoader
                sizeUnit={"px"}
                height={5}
                width={100}
                color={'white'}
                loading={pending}
              />
            </div>

            {this.renderFooter()}
          </div>

        </div>
      )
    } else {
      return (
        <div className="wrapper">
          {this.renderBanner()}

          <div style={{display: "none"}} id="dimmer"></div>
          <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>

          <div style={{display: "none"}} id="log-in" className="container">
            <h1 style={{textAlign: 'center'}}>Welcome to SimpleID's example experience!</h1>

            <form className="form">
              <h2>Please Sign In:</h2>
              <span style={{display: "none", textAlign: 'center', color:'red', fontFamily:'sans-serif', fontWeight:'bold', fontSize:'large'}} id="error-sign-in-fields">Please fill in all fields:</span>
              <input id="username-input" type="text" placeholder="Username"/>
              <input id="password-input" type="password" placeholder="Password"/>
              <div style={{display: "none", margin: "15px", fontWeight: "600"}} id="log-in-recovery">
                <h4>Looks like this is a new device or it's been a while since you logged in. You'll have to enter your email address as well to log in.</h4>
                <input style={{marginTop: "15px"}} id="email-input" type="email" placeholder="Email"/>
              </div>
              <button onClick={this.handleLogIn} style={{display:'block', margin:'auto'}} type="submit" id="login-button" className="link-button"><img className="auth-button" src={signinButton} alt="login" /></button>
              <h3>... or <a className="active" onClick={this.signupForm}>Sign Up</a> to create an account.</h3>
            </form>
          </div>

          <div id="sign-up" className="container">
            <h1 style={{textAlign: 'center'}}>Welcome to SimpleID's example experience!</h1>

            <form className="form">
              <h2>Please Sign Up:</h2>
              <span style={{display: "none"}} id="name-error">Sorry, that name is taken. Try another!</span>
              <span style={{display: "none", textAlign: 'center', color:'red', fontFamily:'sans-serif', fontWeight:'bold', fontSize:'large'}} id="error-sign-up-fields">Please fill in all fields:</span>
              <input id="username-input-sign-up" type="text" placeholder="Username" />
              <input id="password-input-sign-up" type="password" placeholder="Password"/>
              <input id="email-input-sign-up" type="email" placeholder="Email"/>
              <button onClick={this.handleSignUp} style={{display:'block', margin:'auto'}} type="submit" id="login-button" className="link-button"><img className="auth-button" src={signupButton} alt="sign up" /></button>
              <h3>... or <a className="active" onClick={this.loginForm}>Sign In</a> to your account.</h3>
            </form>
          </div>

          {this.renderFooter()}
        </div>
      );
    }
  }
}

export default App;

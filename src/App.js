import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
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

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

const {simpleIDKeys} = require('./keys');

const simple = new SimpleID({
  appOrigin: "https://www.simpleid.xyz/hello",
  scopes: ['store_write', 'publish_data'],
  apiKey: "123456",
  devId: "justin.email.email@email.com",
  appName: "Hello SimpleID!",
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


const STATES = {
  SIGN_IN_UP: 0,
  PENDING: 1,
  CODE_AUTH: 2,
  SIGNED_IN: 3,
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uiState: (userSession.isUserSignedIn()) ? STATES.SIGNED_IN : STATES.SIGN_IN_UP,
      loadingMessage: "",
      userSession: {},
      signedin: false,
      content: "",
      pending: false,
      page: "ethereumTodo",
    }

    this.email = undefined
  }

  statusCallbackFn = (aStatusMessage) => {
    this.setState( { uiState:STATES.PENDING, loadingMessage:aStatusMessage } )
  }

  handleSignUp = async (e) => {
    e.preventDefault();

    this.email = document.getElementById('sign-up-in-email').value
    const credObj = {
      // id: document.getElementById('username-input-sign-up').value,
      // password: document.getElementById('password-input-sign-up').value,
      email: this.email,
      hubUrl: "https://hub.blockstack.org"
    }

    // Error check
    let error = false
    if (!credObj.email) {
      console.log('TODO: error report - no email found / specified.')
      error = true
    }
    if (error) {
      return
    }

    this.setState({ uiState: STATES.PENDING });

    const options = {
       statusCallbackFn: this.statusCallbackFn,
       passwordless: true
    }
    const payload = { email: credObj.email};
    const signup = await simple.authenticate(payload);
    if(signup.message === "name taken") {
      this.setState({ uiState: STATES.SIGN_IN_UP });
      console.log('TODO: report name error')
    } else if (signup.message === "Approval email sent") {
      this.setState({ uiState: STATES.CODE_AUTH });
      console.log('TODO: show login code field')
    } else {
      // localStorage.setItem('blockstack-session', JSON.stringify(signup.body.store.sessionData));
      if(signup.message === "user session created") {
        this.setState({ uiState: STATES.SIGNED_IN, userSession: signup.body });
      } else {
        this.setState({ uiState: STATES.SIGN_IN_UP });
        console.log('TODO: show trouble signing up')
        // document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
        // document.getElementById('growl-p').innerText = "Trouble signing up";
        // setTimeout(() => {
        //   document.getElementById('growl').style.display = "none";
        //   document.getElementById('growl-p').innerText = "";
        // }, GROWL_DELAY)
      }
    }
  }

  handleLoginWithCode = async(e) => {
    e.preventDefault();
    const payload = {
      email: this.email,
      token: document.getElementById('code-from-email').value,
    };

    const signup = await simple.authenticate(payload);
    if (signup.message = 'user session created') {
      const bstackSession = await simple.getBlockstackSession()
      await this.setState({ uiState: STATES.SIGNED_IN, userSession: bstackSession });
    }
  }

  handlSignOut = (event) =>
  {
    event.preventDefault()
    localStorage.removeItem('blockstack-session')
    window.location.reload()
  }

  renderBanner(isSignedIn=false)
  {
    const handlSignOutButton = isSignedIn ?
      ( <Button variant="info" size="md" onClick={this.handlSignOut}>Sign Out</Button> ) :
      undefined

    return (
      <div className="banner">
        <div className="banner-content">
          <img className="banner-logo" src={logo} alt="Simple ID" />
          {handlSignOutButton}
        </div>
      </div>
    )
  }

  renderWelcome()
  {
    const loadingMessage = 'Hello ...'
    const pending = true

    let welcomeContent = undefined
    switch (this.state.uiState) {
      case STATES.CODE_AUTH:
        welcomeContent = (
          <Form>
            <Form.Group controlId="code-from-email">
              <Form.Label>Enter the 6 digit code one-time code you received via email:</Form.Label>
              <Form.Control type="number" size="md" autocomplete="off" placeholder="******" />
            </Form.Group>
            <Button variant="info" type="submit" size="md" onClick={this.handleLoginWithCode}>
              Submit
            </Button>
          </Form>
        )
        break;
      case STATES.PENDING:
        welcomeContent = (
          <div className="activity-indicator">
            <h4 style={{fontStyle:'italic'}}>{loadingMessage}</h4>
            <BarLoader
              sizeUnit={"px"}
              height={5}
              width={100}
              color={'white'}
              loading={pending}
            />
          </div>
        )
        break;
      case STATES.SIGN_IN_UP:
      default:
        welcomeContent = (
          <Form>
            <Form.Group controlId="sign-up-in-email">
              <Form.Label>Enter an e-mail that you have access to here, and we will e-mail you a one time use 6 digit code:</Form.Label>
              <Form.Control type="email" size="md" autocomplete="off" placeholder="email.address@example.com" />
              <Form.Text className="text-muted">
              * We will not use this e-mail for marketing purposes unless you
              indicate your interest in the app.
              </Form.Text>
            </Form.Group>
            <Button variant="info" type="submit" size="md" onClick={this.handleSignUp}>
              Sign Up / In
            </Button>
          </Form>
        )
    }

    return (
      <div className="page">
        <div className="page-section">
          <Jumbotron>
            <h2>
              Welcome to SimpleID's example experience!
            </h2>
            <p>
              This hello world application shows you the power of a simple passwordless login
              to access the blockchain.
            </p>
            {welcomeContent}
          </Jumbotron>
        </div>
      </div>
    )
  }

  renderAccount()
  {
    return (
      <div className="page">
        Account
      </div>
    )
  }

  render()
  {
    console.log('render:')
    console.log(this.state.uiState)

    let contentArea = undefined
    switch (this.state.uiState) {
      case STATES.SIGNED_IN:
        contentArea = this.renderAccount()
        break;
      case STATES.SIGN_IN_UP:
      case STATES.PENDING:
      case STATES.CODE_AUTH:
      default:
        contentArea = this.renderWelcome()
    }

    return (
      <div className="wrapper-flex">
        {this.renderBanner(userSession.isUserSignedIn())}
        {contentArea}
      </div>
    )
  }





  // renderOld() {
  //
  //   let { pending, content, page, loadingMessage } = this.state;
  //
  //   const activeTab = {
  //     background: "#fff",
  //     color: "#809eff",
  //     borderStyle: 'solid',
  //     borderWidth: 1,
  //     borderColor: '#dadada',
  //     borderBottomColor: '#fff',
  //     marginBottom: -1
  //   };
  //   const inactiveTab = {
  //     background: "#809eff",
  //     color: "#fff",
  //   }
  //   if(userSession.isUserSignedIn()) {
  //     return (
  //       <div className="wrapper">
  //         {this.renderBanner(true)}
  //
  //         <div style={{display: "none"}} id="dimmer"></div>
  //         <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>
  //
  //         <div className="container" style={{flex:'none', paddingTop:0}}>
  //           <h4 style={{color: "#fff"}}>Signed-in as {userSession.loadUserData().username}</h4>
  //         </div>
  //
  //         <div id='evil-container' className="container">
  //           <div className="tabs">
  //             <ul style={{position: "relative", zIndex: "999"}}>
  //               <li style={page === "ethereumTodo" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ethereumTodo" })}>Ethereum</li>
  //               {/*<li style={page === "ethereum" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ethereum" })}>Ethereum Example</li>*/}
  //               <li style={page === "ipfs" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "ipfs" })}>IPFS</li>
  //               <li style={page === "blockstack" ? activeTab : inactiveTab} onClick={() => this.setState({ page: "blockstack" })}>Blockstack</li>
  //             </ul>
  //           </div>
  //           <div className="card">{this.getPage(page, userSession, content)}</div>
  //         </div>
  //
  //       </div>
  //     );
  //   } else if(pending) {
  //     return (
  //       <div className="wrapper">
  //         {this.renderBanner()}
  //
  //         <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>
  //
  //         <div className="container">
  //           <h1>Just a moment...</h1>
  //           <h2 style={{fontStyle:'italic'}}>{loadingMessage}</h2>
  //           <div style={{display:"inline-block", marginTop:10, marginLeft:'auto', marginRight:'auto', marginBottom:'auto'}}>
  //           {/*<div style={{display:"inline-block", margin:'auto'}}>*/}
  //             <BarLoader
  //               sizeUnit={"px"}
  //               height={5}
  //               width={100}
  //               color={'white'}
  //               loading={pending}
  //             />
  //           </div>
  //
  //         </div>
  //
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div className="wrapper">
  //         {this.renderBanner()}
  //
  //         <div style={{display: "none"}} id="dimmer"></div>
  //         <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>
  //
  //         <div id="sign-up" className="container">
  //           <h1 style={{textAlign: 'center'}}>Welcome to SimpleID's example experience!</h1>
  //           <div style={{marginTop:30, background:'darkgray', borderStyle:'solid', borderWidth:1, borderColor:'lightgray', borderRadius:10}}>
  //             <form className="form">
  //               <h2>Please Sign Up/In:</h2>
  //               <span style={{display: "none"}} id="name-error">Sorry, that name is taken. Try another!</span>
  //               <span style={{display: "none", textAlign: 'center', color:'red', fontFamily:'sans-serif', fontWeight:'bold', fontSize:'large'}} id="error-sign-up-fields">Please fill in all fields:</span>
  //               <input id="email-input-sign-up" type="email" placeholder="Email"/>
  //               <button onClick={this.handleSignUp} style={{display:'block', margin:'auto'}} type="submit" id="login-button" className="link-button"><img className="auth-button" src={signupButton} alt="sign up" /></button>
  //             </form>
  //           </div>
  //         </div>
  //
  //         <div id="enter-code"  style={{display: "none"}} className="container">
  //           <h1 style={{textAlign: 'center'}}>Welcome to SimpleID's example experience!</h1>
  //           <div style={{marginTop:30, background:'darkgray', borderStyle:'solid', borderWidth:1, borderColor:'lightgray', borderRadius:10}}>
  //             <form className="form">
  //               <h2>Please enter the code you were emailed ...</h2>
  //               <span style={{display: "none", textAlign: 'center', color:'red', fontFamily:'sans-serif', fontWeight:'bold', fontSize:'large'}} id="error-enter-code-fields">Please fill in all fields:</span>
  //               <input id="code-from-email" type="text" autocomplete="off" placeholder="Code from email"/>
  //               <button onClick={this.handleLoginWithCode} style={{display:'block', margin:'auto'}} type="submit" id="code-button" className="link-button"><img className="auth-button" src={signupButton} alt="sign in" /></button>
  //             </form>
  //           </div>
  //         </div>
  //
  //       </div>
  //     );
  //   }
  // }
}

export default App;

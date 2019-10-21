import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
import logo from './white-logo.png';
//import { login, createUserAccount } from 'simpleid-js-sdk';
// import signupButton from './hellosignup.png';
// import signinButton from './hellosignin.png';
// import BlockstackPage from './BlockstackPage';
// import EthereumPage from './EthereumPage';
// import EthereumTodoPage from './EthereumTodoPage';
// import PinataPage from './IPFSPage';
import BarLoader from 'react-spinners/BarLoader';
import SimpleID from 'simpleid-js-sdk';

import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Jumbotron,
  Row, 
  Image
} from 'react-bootstrap'
import tools from './tools.png';
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

//const GROWL_DISPLAY_STYLE = 'flex'
//const GROWL_DELAY = 5000 // ms


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
      page: "ethereumTodo",
      show: false
    }

    this.email = undefined
  }

  statusCallbackFn = (aStatusMessage) => {
    this.setState( { loadingMessage:aStatusMessage } )
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

    // const options = {
    //    statusCallbackFn: this.statusCallbackFn,
    //    passwordless: true
    // }
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
    if (signup.message === 'user session created') {
      const bstackSession = simple.getBlockstackSession()
      const userData = simple.getUserData()
      console.log('userData:')
      console.log(userData)
      this.setState({ uiState: STATES.SIGNED_IN, userSession: bstackSession });
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
      ( <Button variant="danger" size="md" onClick={this.handlSignOut}>Sign Out</Button> ) :
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
    const loadingMessage = this.state.loadingMessage

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
              loading={true}
            />
          </div>
        )
        break;
      case STATES.SIGN_IN_UP:
      default:
        welcomeContent = (
          <Form>
            <Form.Group controlId="sign-up-in-email">
              <Form.Label>Enter an e-mail that you have access to here, and we will e-mail you a one-time use 6 digit code:</Form.Label>
              <Form.Control type="email" size="md" placeholder="email.address@example.com" />
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
              This basic application shows you the power of a simple passwordless login
              to access the blockchain.
            </p>
            {welcomeContent}
          </Jumbotron>
        </div>
      </div>
    )
  }

  privateDismissibleExample() {
    if (this.state.show) {
      return (
        <Alert variant="danger" onClose={() => this.setState({show: false})} dismissible>
          <Alert.Heading>Your Private Key</Alert.Heading>
          <p>{userSession.loadUserData().appPrivateKey}</p>
        </Alert>
      );
    }
    return <Button onClick={() => this.setState({show: true})}>Show My Private Key</Button>;
  }

  renderAccount()
  {
    const userData = simple.getUserData()
    return (
      <div className="page">
        <div className="page-section">
          <Jumbotron>
            <h3>
              Congratulations! You just saw how easy it can be for your users to log into your blockchain-based application.
            </h3>
            <br/>
            <p>
              But SimpleID gets you so much more than authentication. Below, we've outlined some of the benefits you and your users can expect when you build with us.
            </p>
            <br/>
            <h2>Get in Touch</h2>
            <p>
              Whether you're a large enterprise or a single developer, we can help you build and integrate blockchain technology in your application.
            </p>
            <Button variant="success" type="submit" size="md" href="mailto:hello@simpleid.xyz">
              Contact Us!
            </Button>
          </Jumbotron>
        </div>

        <div className="page-section">
          <Card>
            <Card.Header as="h5">One-time codes</Card.Header>
            <Card.Body>
              <Card.Title>Standard TOTP / HOTP one-time codes are used for:</Card.Title>
              <Card.Text>
                <ul>
                  <li>Creating accounts.</li>
                  <li>Signing into accounts.</li>
                  <li>Approving blockchain transactions.</li>
                </ul>
                <p>
                  The codes are scoped to the application being used and expire within 5 minutes of being generated. Codes can be received via email, authenticator app, and SMS.
                </p>
              </Card.Text>
              <Button variant="primary" href="https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm" target="_blank">Learn More</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="page-section">
          <Card>
            <Card.Header as="h5">Bip39 master keychain and security</Card.Header>
            <Card.Body>
              <Card.Title>We use Shamir Secret Sharing to split your master keychain into 3 pieces</Card.Title>
              <br/>
              <h6>
                The three shares can be stored by <i>the user, the enterprise, and a trusted 3rd party</i>. The master keychain is only available when 2 of 3 parties approve,
                thus avoiding chances of a single bad actor.
              </h6>
              <br/>
              <Alert variant="danger"><i>Complete: robust pipe raise illness symptom crowd trip will slow assault recipe oven</i></Alert>
              <br/>
              <Card.Text>
                <il>
                  <Alert variant="secondary"><b>Share 1: </b>robust ____ raise _______ symptom crowd ____ will slow assault recipe ____</Alert>
                </il>
                <il>
                  <Alert variant="secondary"><b>Share 2: </b>robust pipe _____ illness symptom _____ trip will slow _______ ______ oven</Alert>
                </il>
                <il>
                  <Alert variant="secondary"><b>Share 3: </b>______ pipe raise illness _______ crowd trip ____ ____ assault recipe oven</Alert>
                </il>
              </Card.Text>
              <Button variant="primary" href="https://wiki.trezor.io/Shamir_Backup#What_happens_if_some_of_the_shares_get_lost_or_stolen.3F" target="_blank">Learn More</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="page-section">
          <Card>
            <Card.Header as="h5">App and user specific encryption keys</Card.Header>
            <Card.Body>
              {/*<Card.Title>Standard TOTP / HOTP one-time codes are used for:</Card.Title>*/}
              <Card.Text>
                <p>
                  SimpleID uses ECIES Encryption technology with key pairs unique to each user and application. This means that if an encryption key is ever compromised, breaches do not spread to other users or applications using SimpleID.
                </p>
                <p>
                  Key pairs for both encryption and signing are provided.
                </p>
              </Card.Text>
              {this.privateDismissibleExample()}
            </Card.Body>
          </Card>
        </div>

        <div className="page-section">
          <Card>
            <Card.Header as="h5">Blockchain wallets for each of your users are created automatically</Card.Header>
            <Card.Body>

              <Card.Title>
                Transactions with these wallets can only be approved by the user through a one-time code mechanism similar to that used for signing in / up.
              </Card.Title>

              <Card.Text>
                <Row>
                  <Col>
                    <Card className="wallets" border="warning">
                      <Card.Header>Bitcoin Wallet Address: {userData.wallet.btcAddr}</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          See activity for this address <a href={`https://blockexplorer.com/address/${userData.wallet.btcAddr}`} target="_blank" rel="noopener noreferrer">here</a>. 
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="wallets" border="primary">
                      <Card.Header>Ethereum Wallet Address: {userData.wallet.ethAddr}</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          See activity for this address <a href={`https://etherscan.io/address/${userData.wallet.ethAddr}`}>here</a>.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="wallets" border="info">
                      <Card.Header>Blockstack Wallet Address: {userData.wallet.stkAddr}</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          See activity for this address <a href={`https://explorer.blockstack.org/address/stacks/${userData.wallet.stkAddr}`}>here</a>.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Text>
              <Card.Body>
                <Card.Text>You didn't see any activity at any of those addresses did you? That's because they are brand new. Your users can fund their wallets themselves, or SimpleID makes it easy for them to buy cryptocurrency without ever leaving your application.</Card.Text>
              </Card.Body>
              <Button variant="primary" href="https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm" target="_blank">Learn More</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="page-section">
          <Card>
            <Card.Header as="h5">Why should you use SimpleID?</Card.Header>
            <Card.Body>
              <Card.Title>Here is what a developer needs to do to build a working Ethereum app today:</Card.Title>
              <Card.Text>
              <Image src={tools} rounded fluid />
                <ol>
                  <li>Setup Infura (or run your own node)</li>
                  <li>Matic or Loom for layer2</li>
                  <li>Wyre or Simplex for cyrpto payments</li>
                  <li>Web3.js or Ethers.js for interacting with the ethereum blockchain</li>
                  <li>IPFSPinata or Temporal to ensure IPFS data is always available</li>
                  <li>Metamask for auth</li>
                  <li>Mailgun or Sendgrid for user notifications</li>
                  <li>HOTP or TOTP for one-time codes for MFA support</li>
                  <li>Maintain all of the above........</li>
                </ol>
                <br/>
                <h4>
                  Or use SimpleID, a one stop solution for all your Blockchain needs!
                </h4>
              </Card.Text>
              <Button variant="success" type="submit" size="md" href="mailto:hello@simpleid.xyz">
                Contact Us!
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }

  render()
  {
    console.log('userSession:')
    console.log(userSession)
    console.log()
    if (userSession.isUserSignedIn()) {
      console.log('uPDURE:')
      const ud = userSession.loadUserData()
      console.log(ud)
      console.log()
    }
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

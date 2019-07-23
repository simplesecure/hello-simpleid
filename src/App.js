import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
import './App.css';
import logo from './white-logo.png';
import { login, createUserAccount } from 'simpleid-js-sdk';
const appObj = { appOrigin: window.location.origin, scopes: ['store_write', 'publish_data']}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: {}, 
      signedin: false, 
      content: "",
      activeClass: "signin",
      pending: false
    }
  }
  componentDidMount() {
    const userSessionInStorage = JSON.parse(localStorage.getItem('blockstack-session'));
    console.log(userSessionInStorage)
    if(userSessionInStorage) {
      const appConfig = new AppConfig(appObj.scopes);
      const userSession = new UserSession({ appConfig });
      this.setState({ userSession, signedin: true })
    } else {
      this.setState({ userSession: {}, signedin: false })
    }
  }
  loginForm = () => {
    this.setState({ activeClass: "signin" });
    //document.getElementById('log-in-button').style.display = "none";
    //document.getElementById('sign-up-button').style.display = "block";
    document.getElementById('log-in').style.display = "block";
    document.getElementById('sign-up').style.display = "none";
  }
  
  signupForm = () => {
    this.setState({ activeClass: "signup" });
    //document.getElementById('log-in-button').style.display = "block";
    //document.getElementById('sign-up-button').style.display = "none";
    document.getElementById('log-in').style.display = "none";
    document.getElementById('sign-up').style.display = "block";
  }
  
  handleSignUp = async (e) => {
    e.preventDefault();
    this.setState({ pending: true });
    const credObj = {
      id: document.getElementById('username-input-sign-up').value,
      password: document.getElementById('password-input-sign-up').value,
      email: document.getElementById('email-input-sign-up').value,
      hubUrl: "https://hub.blockstack.org"
    }
    const signup = await createUserAccount(credObj, appObj)
    localStorage.setItem('blockstack-session', JSON.stringify(signup.body.body.store.sessionData));
    if(signup.message === "Need to go through recovery flow") {
      document.getElementById('log-in-recovery').style.display = "block";
    } else if(signup.message === "successfully created user session") {
      this.setState({ userSession: signup.body.body, signedin: true, pending: false });
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
  
  handleLogIn = async(e) => {
    e.preventDefault();
    this.setState({ pending: true });
    const credObj = {
      id: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value,
      hubUrl: "https://hub.blockstack.org", 
      email: document.getElementById('email-input') ? document.getElementById('email-input').value : null
    }
    const params = {
      login: true,
      credObj,
      appObj
    }
    const signin = await login(params);
    if(signin.message === "Need to go through recovery flow") {
      this.setState({ pending: false });
      document.getElementById('log-in-recovery').style.display = "block";
    } else if(signin.message === "user session created") {
      localStorage.setItem('blockstack-session', JSON.stringify(signin.body.body.store.sessionData));
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

  saveContent = (e) => {
    e.preventDefault();
    const { userSession } = this.state;
    const content = document.getElementById('content-input').value;
    const title = document.getElementById('title-input').value;
    document.getElementById('growl').style.display = "block";
    document.getElementById('growl-p').innerText = "Saving file...";
    if(title && content) {
      userSession.putFile(`${title}.json`, content, {encrypt: false})
        .then((res) => {
          console.log(res);
          document.getElementById('growl').style.display = "block";
          document.getElementById('growl-p').innerText = "File saved!";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        }).catch((err) => {
          console.log(err)
          document.getElementById('growl').style.display = "block";
          document.getElementById('growl-p').innerText = "Trouble saving";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        });
    }
  }

  fetchContent = (e) => {
    e.preventDefault();
    document.getElementById('growl').style.display = "block";
    document.getElementById('growl-p').innerText = "Fetching content...";
    const { userSession } = this.state;
    const title = document.getElementById('title-input').value;
    if(title) {
      userSession.getFile(`${title}.json`, {decrypt: false})
        .then((res) => {
          this.setState({ content: res });
          if(res) {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          } else {
            document.getElementById('growl').style.display = "block";
            document.getElementById('growl-p').innerText = "No file found";
            setTimeout(() => {
              document.getElementById('growl').style.display = "none";
              document.getElementById('growl-p').innerText = "";
            }, 2000)
          }
        }).catch((err) => {
          console.log(err);
          document.getElementById('growl').style.display = "block";
          document.getElementById('growl-p').innerText = "Trouble saving";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        })
    }
  }

  renderFooter() {
    return (
      <footer>
        <img src={logo} alt="simpleid" />
      </footer>
    )
  }
  render() {
    const { signedin, userSession, activeClass, pending } = this.state;
    console.log(userSession);
    if(signedin) {
      return (
        <div style={{paddingTop: "100px"}} className="wrapper">
          <div style={{display: "none"}} id="growl"><p id="growl-p"></p></div>
          <div className="container">
            <form className="form">
              <button style={{marginBottom: "25px"}} className="button" onClick={this.signOut}>Sign Out</button>
              <h1 style={{marginBottom: "15px"}}>Hello, {userSession.loadUserData().username}</h1>
              <h2 style={{marginBottom: "15px"}}>Test storing some content</h2>
              <input type="text" id="title-input" />
              <label>File name</label>
              <br/>
              <input style={{marginTop: "10px"}} type="text" id="content-input" />
              <label>Type some content to save</label>
              <br/>
              <button style={{marginTop: "15px"}} onClick={this.saveContent}>Store content</button>
              <br/>
              <button style={{marginTop: "15px"}} onClick={this.fetchContent}>Fetch content</button>
              
            </form>
            <div style={{marginTop: "20px"}}>
              <h3>Your stored content will appear below when fetched</h3>
              <div style={{marginTop: "20px"}}>
                <h1>{this.state.content}</h1>
              </div>
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
                  <input id="password-input" type="password" placeholder="Password"/>
                  <div style={{display: "none", margin: "15px", fontWeight: "600"}} id="log-in-recovery">
                    <h4>Looks like this is a new device or it's been a while since you logged in. You'll have to enter your email address as well to log in.</h4>
                    <input style={{marginTop: "15px"}} id="email-input" type="email" placeholder="Email"/>
                  </div>
                  <button onClick={this.handleLogIn} type="submit" id="login-button">Sign In</button>
                </form>
              </div>

              <div style={{display: "none"}} id="sign-up" className="container">
                <h1>Welcome, please sign up</h1>
                
                <form className="form">
                  <input id="username-input-sign-up" type="text" placeholder="Username"/>
                  <input id="password-input-sign-up" type="password" placeholder="Password"/>
                  <input id="email-input-sign-up" type="email" placeholder="Email"/>
                  <button onClick={this.handleSignUp} type="submit" id="login-button">Sign Up</button>
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

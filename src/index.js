import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SimpleID from 'simpleid-js-sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
const CONTRACT_ADDRESS = "0x612652B2082ec6144493cA539DC5Ff4385e21736";
const network = "layer2";
const simple = new SimpleID({
  appOrigin: "https://www.simpleid.xyz/whitepaper",
  scopes: ['store_write', 'publish_data'],
  apiKey: "123456",
  devId: "justin.email.email@email.com",
  appName: "SimpleID Interactive Whitepaper",
  development: true,
  network,
  localRPCServer: 'http://localhost:7545'
});

const USERSESSION = simple.getBlockstackSession();

const STATES = {
  SIGN_IN_UP: 0,
  PENDING: 1,
  CODE_AUTH: 2,
  SIGNED_IN: 3,
}

setGlobal({ 
  contractAddress: CONTRACT_ADDRESS, 
  contract: {},
  network,
  simple, 
  address: simple.getUserData() ? simple.getUserData().wallet.ethAddr : "",
  balance: 0,
  loadingMessage: "", 
  pageStates: STATES, 
  userSession: USERSESSION, 
  uiState: (USERSESSION.isUserSignedIn()) ? STATES.SIGNED_IN : STATES.SIGN_IN_UP,
  email: "",
  code: "", 
  sectionsUnlocked: 0, 
  userId: 0
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

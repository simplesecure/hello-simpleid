import React, { setGlobal } from 'reactn';
import Welcome from '../components/Welcome';

export default class Auth extends React.Component {

  statusCallbackFn = (aStatusMessage) => {
    setGlobal( { loadingMessage:aStatusMessage } )
  }

  render() {
    const { uiState, pageStates } = this.global;
    switch (uiState) {
      case pageStates.SIGN_IN_UP:
        return ( 
          <div className="wrapper-flex">
            <Welcome />
          </div>
        )
    
      case pageStates.CODE_AUTH:
      default:
        return ( 
          <div className="wrapper-flex">
            <Welcome />
          </div>
        )
    }
  }
}
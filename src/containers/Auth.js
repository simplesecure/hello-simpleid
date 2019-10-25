import React, { setGlobal } from 'reactn';
import Welcome from '../components/Welcome';
import BarLoader from 'react-spinners/BarLoader';

export default class Auth extends React.Component {

  statusCallbackFn = (aStatusMessage) => {
    setGlobal( { loadingMessage:aStatusMessage } )
  }

  render() {
    const { uiState, pageStates, loadingMessage } = this.global;
    switch (uiState) {
      case pageStates.SIGN_IN_UP:
        return ( 
          <div className="wrapper-flex">
            <Welcome />
          </div>
        )
      case pageStates.PENDING:
        return (
          <div className="wrapper-flex">
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
import React, {setGlobal } from 'reactn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import BarLoader from 'react-spinners/BarLoader';
import { handleLoginWithCode, handleSignUp } from '../actions/auth';


export default class Welcome extends React.Component {
  renderState() {
    const { uiState, pageStates, loadingMessage } = this.global;
  
    switch (uiState) {
      case pageStates.CODE_AUTH:
        return (
          <Form>
            <Form.Group controlId="code-from-email">
              <Form.Label>Enter the 6 digit code one-time code you received via email:</Form.Label>
              <Form.Control onChange={(e) => setGlobal({ code: e.target.value })} type="number" size="md" autoComplete="off" placeholder="******" />
            </Form.Group>
            <Button variant="info" type="submit" size="md" onClick={handleLoginWithCode}>
              Submit
            </Button>
          </Form>
        )
      case pageStates.PENDING:
        return (
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
      case pageStates.SIGN_IN_UP:
      default:
        return (
          <Form>
            <Form.Group controlId="sign-up-in-email">
              <Form.Label>Enter an e-mail that you have access to here, and we will e-mail you a one-time use 6 digit code:</Form.Label>
              <Form.Control type="email" size="md" onChange={(e) => setGlobal({ email: e.target.value })} placeholder="email.address@example.com" />
              <Form.Text className="text-muted">
              * We will not use this e-mail for marketing purposes unless you
              indicate your interest in the app.
              </Form.Text>
            </Form.Group>
            <Button variant="info" type="submit" size="md" onClick={handleSignUp}>
              Sign Up / In
            </Button>
          </Form>
        )
    }
  }

  render() {
    return (
      <div className="page">
        <div className="page-section">
          <Jumbotron>
            <h2>
              Experience the SimpleID Whitepaper
            </h2>
            <p>
              Normally, you'd just download a whitepaper and read it. However, we decided to take a different approach. To help 
              demonstrate what's possible when you use SimpleID, we made our whitepaper interactive. Let's start by showing off the authentication system you get when you use SimpleID. 
            </p>
            {this.renderState()}
          </Jumbotron>
        </div>
      </div>
    )
  }
}
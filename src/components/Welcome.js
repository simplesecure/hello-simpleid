import React, {setGlobal } from 'reactn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BarLoader from 'react-spinners/BarLoader';
import Modal from 'react-bootstrap/Modal';
import { handleLoginWithCode, handleSignUp } from '../actions/auth';


export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

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
          <div className="loader-sign-in">
            <h4 style={{fontStyle:'italic'}}>{loadingMessage}</h4>
            <BarLoader
              sizeUnit={"px"}
              height={5}
              width={100}
              color={'#2568EF'}
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
            <Button variant="primary" type="submit" size="md" onClick={handleSignUp}>
              Sign Up / In
            </Button>
          </Form>
        )
    }
  }

  render() {
    const { modalOpen } = this.state;
    return (
      <div>
        <div className="container margin-top-35">
          <h1>
            Experience the SimpleID Whitepaper
          </h1>
          <p>
            Normally, you'd just download a whitepaper and read it. However, we decided to take a different approach. To help 
            demonstrate what's possible when you use SimpleID, we made our whitepaper interactive. Let's start by showing off the authentication system you get when you use SimpleID. 
          </p>
          <span onClick={() => this.setState({ modalOpen: true })} className="whitepaper-how"><em>How does this white paper work?</em></span>
          <Modal show={modalOpen} onHide={() => this.setState({ modalOpen: false })}>
            <Modal.Header closeButton>
              <Modal.Title>A White Paper Experience</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
              Unlike other white papers, we have written and designed this white paper to be interactive. As you read the paper, you will be asked to experience SimpleID's offering to unlock additional sections of the paper.
              All sections unlocked are tracked via a smart contract. We have ensured that all transactions are gas-less for you to make the experience easy, something we make easy for enterprises and developers to enable for 
              their end-users.  
              </p>
              <p>
                You will see a "User Info" button that will reveal you wallet information, show you how your encryption key looks, and let you experiment with buying crytocurreny in-app (with a fake credit card and on testnet, of course).
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ modalOpen: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      
        <div data-overlay className="min-vh-50 bg-white d-flex flex-column justify-content-md-center">
          <section className="py-3">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8">
                  <div className="card card-body shadow">
                    
                    <h2 className="h5 text-center">Sign In/Up With Just an Email</h2>
                    {this.renderState()}
                    
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    )
  }
}
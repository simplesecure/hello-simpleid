import React from 'reactn';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EtherInfo from './EtherInfo';
import Alert from 'react-bootstrap/Alert';

export default class SectionMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalOpen: false, 
      show: false
    }
  }
  privateDismissibleExample() {
    const { show } = this.state;
    const { userSession } = this.global;
    if (show) {
      return (
        <Alert variant="danger" onClose={() => this.setState({show: false})} dismissible>
          <Alert.Heading>Your Private Key</Alert.Heading>
          <p><code>{userSession.loadUserData().appPrivateKey}</code></p>
        </Alert>
      );
    }
    return <Button onClick={() => this.setState({show: true})}>Show My Private Key</Button>;
  }

  render() {
    const { modalOpen } = this.state;
    const { sectionsUnlocked, simple } = this.global;
    const userData = simple.getUserData();
    const sections = [
      {
        title: "Introduction", 
        href: "#section-one"
      }, 
      {
        title: "Web 3.0", 
        href: "#section-two"
      }, 
      {
        title: "Market Strategy Flaws", 
        href: "#section-three"
      }, 
      {
        title: "Ending the Conenvience Tradeoff", 
        href: "#section-four"
      }, 
      {
        title: "Metting People Where They Are", 
        href: "#section-five"
      }, 
      {
        title: "The Solution", 
        href: "#section-six"
      }, 
      {
        title: "Authentication", 
        href: "#section-seven"
      }, 
      {
        title: "Wallet Management", 
        href: "#section-eight"
      }, 
      {
        title: "Blockchain Transactions", 
        href: "#section-nine"
      },
      {
        title: "Data Storage", 
        href: "#section-ten"
      },
      {
        title: "Security & Convenience", 
        href: "#section-eleven"
      }, 
      {
        title: "Conclusion", 
        href: "#section-twelve"
      }
    ]

    const availableSections = sections.slice(0, sectionsUnlocked);
    return (
      <div className="col-md-9 col-lg col-xl-4 sticky-lg-top mb-5 mb-lg-0">
           <button onClick={() => this.setState({ modalOpen: true })} className="btn btn-primary margin-bottom-10">User Info</button>
           <Modal show={modalOpen} onHide={() => this.setState({ modalOpen: false })}>
            <Modal.Header closeButton>
              <Modal.Title>Your User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                When you signed up for an account, SimpleID generated crytocurrency wallets for you. You can explore those below: 
              </p>
              <div>
                <div>
                  <p><strong>Blockchain wallets for each of your users are created automatically</strong></p>
                  <div>
                    <p>
                      Transactions with these wallets can only be approved by the user through a one-time code mechanism similar to that used for signing in / up.
                    </p>
                    <p>
                      <Row>
                        <Col>
                          <div className="wallets" border="warning">
                            <p><strong>Bitcoin Wallet Address:</strong> <code>{userData.wallet.btcAddr}</code></p>
                            <div>
                              <p>
                                See activity for this address <a href={`https://blockexplorer.com/address/${userData.wallet.btcAddr}`} target="_blank" rel="noopener noreferrer">here</a>. 
                              </p>
                            </div>
                          </div>
                        
                     
                          <div className="wallets" border="primary">
                            <p><strong>Ethereum Wallet Address:</strong> <code>{userData.wallet.ethAddr}</code></p>
                            <div>
                              <p>
                                See activity for this address <a href={`https://etherscan.io/address/${userData.wallet.ethAddr}`}>here</a>.
                              </p>
                            </div>
                          </div>
                        
                       
                          <div className="wallets" border="info">
                            <p><strong>Blockstack Wallet Address:</strong> <code>{userData.wallet.stkAddr}</code></p>
                            <div>
                              <p>
                                See activity for this address <a href={`https://explorer.blockstack.org/address/stacks/${userData.wallet.stkAddr}`}>here</a>.
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </p>
                    
                  </div>
                </div>
              </div>
              <p>Let's focus on your Ethereum wallet as a more detailed example. You can see your wallet balance below, and if you haven't yet, you can experiment with purchasing some Ether (testnet) with a credit card (a test one, of course).</p>
              <EtherInfo />
              <p>
                Each time you sign in, an application-specific encryption keypair is derived and sent back to the application. This 
                makes it so that data for this application can be stored, encrypted, with a key specific to you and specific to this 
                application. 
              </p>
              {this.privateDismissibleExample()}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ modalOpen: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          { 
            availableSections.length > 0 ? 
            <ul className="list-group pr-xl-4"> 
            {
              availableSections.map((sec) => {
                return (
                  <li key={sec.title} className="list-group-item px-4 py-3 d-flex justify-content-between">
                    <a href={sec.href}><h6 className="mb-0 link-color">{sec.title}</h6></a>
                  </li>
                )
              }) 
            }
            {
              availableSections.length < sections.length ? 
              <li className="list-group-item px-4 py-3 d-flex justify-content-between">
                <a href="/#unlock-section"><h6 className="mb-0 link-color">Unlock Each Section For More</h6></a>
              </li> : 
              <span/>
            }
            </ul> : 
            <ul className="list-group pr-xl-4">
              <li className="list-group-item px-4 py-3 d-flex justify-content-between">
                <a href="/#pre-section"><h6 className="mb-0 link-color">Absrtract</h6></a>
              </li>
              <li className="list-group-item px-4 py-3 d-flex justify-content-between">
                <a href="/#unlock-section"><h6 className="mb-0 link-color">Unlock Each Section For More</h6></a>
              </li>
            </ul>
          }
      </div>
    )
  }
}
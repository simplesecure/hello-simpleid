import React from 'reactn';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EtherInfo from './EtherInfo';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

export default class SectionMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalOpen: true, 
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

  buyEther = () => {
    const { address, simple } = this.global;
    this.setState({ modalOpen: false })
    simple.buyCrypto({env: "test", currency: "ETH", address, method: "debitcard", redirectUrl: window.location.origin, baseCurrency: "USD", email: simple.getUserData().email })
  }

  render() {
    const { modalOpen } = this.state;
    const { sectionsUnlocked, simple } = this.global;
    const userData = simple.getUserData();
    const path = process.env.NODE_ENV === "production" ? "https://simpleid.xyz/demo" : window.location.origin;

    const sections = [
      {
        title: "Introduction", 
        href: `${path}#section-one`, 
        subSections: [
          {
            title: "Web 3.0", 
            href: `${path}#section-two`
          }, 
          {
            title: "Market Strategy Flaws", 
            href: `${path}#section-three`
          }, 
          {
            title: "Ending the Conenvience Tradeoff", 
            href: `${path}#section-four`
          }, 
          {
            title: "Meeting People Where They Are", 
            href: `${path}#section-five`
          }
        ]
      }, 
      {
        title: "The Solution", 
        href: `${path}#section-six`, 
        subSections: [
          {
            title: "Authentication", 
            href: `${path}#section-seven`
          }, 
          {
            title: "Wallet Management", 
            href: `${path}#section-eight`
          }, 
          {
            title: "Blockchain Transactions", 
            href: `${path}#section-nine`
          },
          {
            title: "Data Storage", 
            href: `${path}#section-ten`
          },
          {
            title: "Security & Convenience", 
            href: `${path}#section-eleven`
          }
        ]
      }, 
      {
        title: "Conclusion", 
        href: `${path}#section-twelve`, 
        subSections: []
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
              <EtherInfo 
                buyEther={this.buyEther}
              />
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
            <Accordion>
            {
              availableSections.map((sec) => {
                return (
                  
                    <li className="list-group-item main-list-item justify-content-between">
                      <Accordion.Toggle href={sec.href} as={"a"} variant="link" eventKey={availableSections.map(a => a.title).indexOf(sec.title).toString()}>
                        <h6 className="mb-0 link-color">{sec.title} <img className="icon primary icon-sm down-caret" src={require("../assets/img/icons/theme/navigation/angle-down.svg")} alt="Icon" /></h6>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={availableSections.map(a => a.title).indexOf(sec.title).toString()}>
                        <ul className="list-group sub-list">
                          {
                            sec.subSections.map((subSec) => {
                              return (
                                <li className="nested-list-item" key={subSec.title}><a href={subSec.href}>{subSec.title}</a></li>
                              )
                            })
                          }
                        </ul>
                      </Accordion.Collapse>
                    </li>
                )
              }) 
            }
             
            {
              availableSections.length < sections.length ? 
              <li className="list-group-item main-list-item justify-content-between">
                <a href="/#unlock-section"><h6 className="mb-0 link-color">Unlock Next Section</h6></a>
              </li> : 
              <span/>
            }
            </Accordion>
            </ul> : 
            <ul className="list-group pr-xl-4">
              <li className="list-group-item main-list-item justify-content-between">
                <a href="/#pre-section"><h6 className="mb-0 link-color">Abstract</h6></a>
              </li>
              <li className="list-group-item main-list-item justify-content-between">
                <a href="/#unlock-section"><h6 className="mb-0 link-color">Unlock Next Section</h6></a>
              </li>
            </ul>
          }
      </div>
    )
  }
}
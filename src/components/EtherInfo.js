import React from 'reactn';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class EtherInfo extends React.Component {
  
  render() {
    const { address, balance, simple, sectionsUnlocked } = this.global;
    
    return (
      <div id="pre-section" className="page-section">
<        Card>
          <Card.Header as="h5">Your Ethereum Wallet</Card.Header>
          <Card.Body>
            <Card.Title>When you signed up, an Ethereum wallet was created for you</Card.Title>
            <Card.Text>
              Your Ethereum address: <code>{address}</code>
            </Card.Text>
            <Card.Text>
              Your Ethereum balance: <code>{balance ? balance : 0} ether</code>
            </Card.Text>
            <hr/>
            {
              balance && balance > 0 ?
              <div>
                <Card.Text>
                  Congratulations, you bought some test ether. You just saw how easy it is to enable in-app purchases for your users. But what actually happened here? Click the button to learn more or move on to the next section.
                </Card.Text>
                <Button variant="primary">How SimpleID Handles Crypto Purchases</Button>
                <Button href={sectionsUnlocked < 1 ? "#unlock-section" : "#section-one"} variant="secondary">Next Section</Button>
              </div>
               : 
              <Row>
              <Col md={6} sm={12}>
                <Card.Text>
                  Normally, interacting with a smart contract requires ether to pay gas fees. However, SimpleID makes it easy for developers to make transactions 
                  free as you’ll see when you unlock each section. That said, SimpleID enables in-app cryptocurrency purchases. You can experiment with that to the right.
                </Card.Text>
              </Col>
              <Col md={6} sm={12}>
                <Card>
                  <Card.Body>
                    <Button onClick={() => simple.buyCrypto({env: "test", currency: "ETH", address, method: "debitcard", redirectUrl: window.location.origin, baseCurrency: "USD", email: simple.getUserData().email })} id="buy" variant="primary">Buy Ether</Button>
                    <Card.Text>Note: Test transactions only, no real credit card information needed.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            }
          </Card.Body>
        </Card>
      </div>
    )
  }
}
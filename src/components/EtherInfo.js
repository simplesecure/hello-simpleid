import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class EtherInfo extends React.Component {
  
  render() {
    const { address, balance, simple } = this.global;
    
    return (
      <div id="pre-section">
        <div>
          <h5>Your Ethereum Wallet</h5>
          <div>
            <h6>When you signed up, an Ethereum wallet was created for you</h6>
            <p>
              Your Ethereum address: <code>{address}</code>
            </p>
            <p>
              Your Ethereum balance: <code>{balance ? balance : 0} ether</code>
            </p>
            <hr/>
            {
              balance && balance > 0 ?
              <div>
                <p>
                  Congratulations, you bought some test ether. You just saw how easy it is to enable in-app purchases for your users.
                </p>                                
              </div>
               : 
              <Row>
              <Col sm={12}>
                <p>
                  Normally, interacting with a smart contract requires ether to pay gas fees. However, SimpleID makes it easy for developers to make transactions 
                  free as you’ll see when you unlock each section. That said, SimpleID enables in-app cryptocurrency purchases. You can experiment with that below, or you can skip to the next section.
                </p>
              </Col>
              <Col sm={12}>
                <div>
                  <div>
                    <Button onClick={() => simple.buyCrypto({env: "test", currency: "ETH", address, method: "debitcard", redirectUrl: window.location.origin, baseCurrency: "USD", email: simple.getUserData().email })} id="buy" variant="primary">Buy Ether</Button>
                    <p>Note: Test transactions only, no real credit card information needed. Use the following credit card information to make a test purchase:</p>
                    <p>Number: <code>4000023104662535</code></p>
                    <p>Expiration: <code>12/2020</code></p>
                    <p>Security Code: <code>123</code></p>
                  </div>
                </div>
              </Col>
            </Row>
            }
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}
import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class SectionFour extends React.Component {
  render() {
    const { simple } = this.global;
    const userData = simple.getUserData();

    return(
      <div id="section-four" className="page-section">
        <Card>
          <Card.Header as="h5">Blockchain wallets for each of your users are created automatically</Card.Header>
          <Card.Body>
            <Card.Title>
              Transactions with these wallets can only be approved by the user through a one-time code mechanism similar to that used for signing in / up.
            </Card.Title>
            <Card.Text>
              <Row>
                <Col>
                  <Card className="wallets" border="warning">
                    <Card.Header>Bitcoin Wallet Address: {userData.wallet.btcAddr}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        See activity for this address <a href={`https://blockexplorer.com/address/${userData.wallet.btcAddr}`} target="_blank" rel="noopener noreferrer">here</a>. 
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="wallets" border="primary">
                    <Card.Header>Ethereum Wallet Address: {userData.wallet.ethAddr}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        See activity for this address <a href={`https://ropsten.etherscan.io/address/${userData.wallet.ethAddr}`} target="_blank" rel="noopener noreferrer">here</a>.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="wallets" border="info">
                    <Card.Header>Blockstack Wallet Address: {userData.wallet.stkAddr}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        See activity for this address <a href={`https://explorer.blockstack.org/address/stacks/${userData.wallet.stkAddr}`}>here</a>.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Text>
            <Card.Body>
              <Card.Text>You didn't see any activity at any of those addresses did you? That's because they are brand new. Your users can fund their wallets themselves, or SimpleID makes it easy for them to buy cryptocurrency without ever leaving your application.</Card.Text>
            </Card.Body>
            <Button variant="primary" href="https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm" target="_blank">Learn More</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
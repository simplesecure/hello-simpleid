import React from 'reactn';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class SectionOne extends React.Component {

  render() {
    const { sectionsUnlocked } = this.global;
    return(
      <div id="section-one" className="page-section">
        <Card>
          <Card.Header as="h5">One-time codes</Card.Header>
          <Card.Body>
            <Card.Title>Standard TOTP / HOTP one-time codes are used for:</Card.Title>
            <ul>
              <li>Creating accounts.</li>
              <li>Signing into accounts.</li>
              <li><span className="highlight">Approving blockchain transactions</span>.</li>
            </ul>
            <Card.Text>You saw our one-time codes in action when you first signed in, but they are also used for approving blockchain transactions like the one you just approved. 
              This whitepaper is built around a smart contract that unlocks sections when you initiate a transaction telling the contract to do so. By clicking "Unlock Next Section", you generated a transaction that was held in our DB. That transaction is unable to be broadcast to the underlying chain until you approve it. 
              So, we send you a one-time approval code. You can review the transaction and approve if you wish, or you can ignore it and the transaction will timeout. 
            </Card.Text>
            <Card.Text>
              The codes are scoped to the application being used and expire within 5 minutes of being generated. Codes can be received via email, authenticator app, and SMS. Without you supplying these codes, SimpleID cannot take any action on your behalf (authentication, transaction signing, sending funds, etc). Think of these codes as safe deposit box keys that are generated on the fly.
            </Card.Text>
            <Button variant="primary" href="https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm" target="_blank">Learn More</Button>
            <Button href={sectionsUnlocked < 2 ? "#unlock-section" : "#section-two"} variant="secondary">Next Section</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
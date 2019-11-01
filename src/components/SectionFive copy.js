import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import tools from '../assets/img/tools.png';

export default class SectionFive extends React.Component {
  render() {
    return(
      <div id="section-five" className="page-section">
        <Card>
          <Card.Header as="h5">Why should you use SimpleID?</Card.Header>
          <Card.Body>
            <Card.Title>Here is what a developer needs to do to build a working Ethereum app today:</Card.Title>
            
            <Image src={tools} rounded fluid />
            <ol>
              <li>Setup Infura (or run your own node)</li>
              <li>Matic or Loom for layer2</li>
              <li>Wyre or Simplex for cyrpto payments</li>
              <li>Web3.js or Ethers.js for interacting with the ethereum blockchain</li>
              <li>IPFSPinata or Temporal to ensure IPFS data is always available</li>
              <li>Metamask for auth</li>
              <li>Mailgun or Sendgrid for user notifications</li>
              <li>HOTP or TOTP for one-time codes for MFA support</li>
              <li>Maintain all of the above........</li>
            </ol>
            <br/>
            <h4>
              Or use SimpleID, a one stop solution for all your Blockchain needs!
            </h4>
            
            <Button variant="success" type="submit" size="md" href="mailto:hello@simpleid.xyz">
              Contact Us!
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
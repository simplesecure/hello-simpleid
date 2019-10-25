import React from 'reactn';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

export default class IntroSection extends React.Component {
  render() {
    return (
      <div className="page-section">
        <Jumbotron>
          <h3>
            Congratulations! You just saw how easy it can be for your users to log into your blockchain-based application.
          </h3>
          <br/>
          <p>
          The SimpleID whitepaper is an interactive experience that not only walks you through what we have built and what we intend to build, but it allows you to experience some of the functionality available through SimpleID. 
          </p>
          <p>Each section of the whitepaper is unlocked via interaction with a smart contract. If you’d like to use the already deployed public contract that everyone uses, leave the "Deploy Your Own Version" OFF. However, if you’d like to experience what it’s like to deploy a smart contract using SimpleID, flip the toggle to ON.</p>

          <p>To unlock each section of the whitepaper, you’ll interact with either SimpleID’s public contract or the contract you deploy by broadcasting a transaction that updates the deployed contract. You should see how simple the experience with SimpleID is in the process.</p>
          <Button variant="primary" href="#pre-section">Get Started</Button>
          <hr/>
          <h2>Get in Touch</h2>
          <p>
            Whether you're a large enterprise or a single developer, we can help you build and integrate blockchain technology in your application.
          </p>
          <Button variant="success" type="submit" size="md" href="mailto:hello@simpleid.xyz">
            Contact Us!
          </Button>
        </Jumbotron>
      </div>
    )
  }
}
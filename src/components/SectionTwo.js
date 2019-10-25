import React from 'reactn';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default class SectionTwo extends React.Component {

  render() {
    const { sectionsUnlocked } = this.global;
    return(
      <div id="section-two" className="page-section">
        <Card>
          <Card.Header as="h5">Bip39 master keychain and security</Card.Header>
          <Card.Body>
            <Card.Title>We use Shamir Secret Sharing to split your master keychain into 3 pieces</Card.Title>
            <br/>
            <h6>
              The three shares can be stored by <i>the user, the enterprise, and a trusted 3rd party</i>. The master keychain is only available when 2 of 3 parties approve,
              thus avoiding chances of a single bad actor.
            </h6>
            <br/>
            <Alert variant="danger"><i>Complete: robust pipe raise illness symptom crowd trip will slow assault recipe oven</i></Alert>
            <br/>
            <Card.Text>
              <il>
                <Alert variant="secondary"><b>Share 1: </b>robust ____ raise _______ symptom crowd ____ will slow assault recipe ____</Alert>
              </il>
              <il>
                <Alert variant="secondary"><b>Share 2: </b>robust pipe _____ illness symptom _____ trip will slow _______ ______ oven</Alert>
              </il>
              <il>
                <Alert variant="secondary"><b>Share 3: </b>______ pipe raise illness _______ crowd trip ____ ____ assault recipe oven</Alert>
              </il>
            </Card.Text>
            <Button variant="primary" href="https://wiki.trezor.io/Shamir_Backup#What_happens_if_some_of_the_shares_get_lost_or_stolen.3F" target="_blank">Learn More</Button>
            <Button href={sectionsUnlocked < 3 ? "#unlock-section" : "#section-three"} variant="secondary">Next Section</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
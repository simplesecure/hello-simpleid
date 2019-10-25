import React from 'reactn';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class SectionThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }
  privateDismissibleExample() {
    const { simple } = this.global;
    const userSession = simple.getBlockstackSession();

    if (this.state.show) {
      return (
        <Alert variant="danger" onClose={() => this.setState({show: false})} dismissible>
          <Alert.Heading>Your Private Key</Alert.Heading>
          <p>{userSession.loadUserData().appPrivateKey}</p>
        </Alert>
      );
    }
    return <Button onClick={() => this.setState({show: true})}>Show My Private Key</Button>;
  }
  render() {
    const { sectionsUnlocked } = this.global;
    return(
      <div id="section-three" className="page-section">
        <Card>
          <Card.Header as="h5">App and user specific encryption keys</Card.Header>
          <Card.Body>
            {/*<Card.Title>Standard TOTP / HOTP one-time codes are used for:</Card.Title>*/}
            <Card.Text>
              <p>
                SimpleID uses ECIES Encryption technology with key pairs unique to each user and application. This means that if an encryption key is ever compromised, breaches do not spread to other users or applications using SimpleID.
              </p>
              <p>
                Key pairs for both encryption and signing are provided.
              </p>
            </Card.Text>
            {this.privateDismissibleExample()}
            <Button href={sectionsUnlocked < 4 ? "#unlock-section" : "#section-four"} variant="secondary">Next Section</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
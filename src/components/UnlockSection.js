import React, { setGlobal } from 'reactn';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BarLoader from 'react-spinners/BarLoader';
import { unlockNextSection, approveTransaction } from '../actions/whitepaper';

export default class UnlockSection extends React.Component {

  render() {
    const { uiState, pageStates, sectionsUnlocked } = this.global;

    return (
      <div id="unlock-section" className="page-section">
        <Card>
          <Card.Header as="h5">Unlock the next section by sending a smart contract transaction</Card.Header>
          <Card.Body>
            <Card.Text>Each section of the whitepaper is locked via smart contract. By sending a transaction to the contract, you can unlock the next section.</Card.Text>
            {
              uiState === pageStates.CODE_AUTH ? 
              <Form>
                <Form.Group controlId="code-from-email">
                  <Form.Label>Enter the 6 digit code one-time code you received via email:</Form.Label>
                  <Form.Control onChange={(e) => setGlobal({ code: e.target.value })} type="number" size="md" autoComplete="off" placeholder="******" />
                </Form.Group>
                <Button variant="info" type="submit" size="md" onClick={approveTransaction}>
                  Submit
                </Button>
              </Form>
              : uiState === pageStates.PENDING ? 
              <BarLoader
                sizeUnit={"px"}
                height={5}
                width={100}
                color={'white'}
                loading={true}
              /> : 
              <Button onClick={() => unlockNextSection(sectionsUnlocked)} variant="primary">Unlock Next Section</Button>
            }            
          </Card.Body>
        </Card>
      </div>
    )
  }
}
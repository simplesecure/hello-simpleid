import React, { setGlobal } from 'reactn';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BarLoader from 'react-spinners/BarLoader';
import { unlockNextSection, approveTransaction } from '../actions/whitepaper';

export default class UnlockSection extends React.Component {

  render() {
    const { uiState, pageStates, sectionsUnlocked, contractAddress } = this.global;

    return (
      <article id="unlock-section">
        <hr />
        <div>
          <h5>Unlock the next section by sending a smart contract transaction</h5>
          <div>
            <p>Each section of the whitepaper is locked via smart contract. By sending a transaction to the contract, you can unlock the next section.</p>
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
              <div className="text-center">
                <BarLoader
                  sizeUnit={"px"}
                  height={5}
                  width={100}
                  color={'#2568EF'}
                  loading={true}
                />
              </div> : 
              <div>
                <Button onClick={() => unlockNextSection(sectionsUnlocked)} variant="primary">Unlock Next Section</Button>
                <Button href={`https://explorer.testnet2.matic.network/address/${contractAddress}/transactions`} target="_blank" rel="noreferrer noopener" className="margin-left-8" variant="outline-primary">View This Contract</Button>
              </div>
            }            
          </div>
        </div>
      </article>
    )
  }
}
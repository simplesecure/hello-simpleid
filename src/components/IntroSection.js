import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class IntroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }
  render() {
    const { modalOpen } = this.state;

    return (
      <article id="pre-section" className="article">
        <div className="text-center whitepaper-title">
          <h3>When You Put Faster Horses on the Blockchain</h3>
          <h5>A White Paper on SimpleID’s Solution to Blockchain and p2p Application User Experience Problems</h5>
          <p>Justin Hunter</p>
          <p>Prabhaav Bhardwaj</p>
          <p>Alex Carreira</p>
          <span onClick={() => this.setState({ modalOpen: true })} className="whitepaper-how">How does this white paper work?</span>
          <Modal show={modalOpen} onHide={() => this.setState({ modalOpen: false })}>
            <Modal.Header closeButton>
              <Modal.Title>A White Paper Experience</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
              Unlike other white papers, we have written and designed this white paper to be interactive. As you read the paper, you will be asked to experience SimpleID's offering to unlock additional sections of the paper.
              All sections unlocked are tracked via a smart contract. We have ensured that all transactions are gas-less for you to make the experience easy, something we make easy for enterprises and developers to enable for 
              their end-users.  
              </p>
              <p>
                You will see a "User Info" button that will reveal you wallet information, show you how your encryption key looks, and let you experiment with buying crytocurreny in-app (with a fake credit card and on testnet, of course).
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ modalOpen: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        
        <h3 className="h2">Abstract</h3>
        <blockquote className="blockquote">
          If I had asked people what they wanted, they would have said faster horses.
        </blockquote>
        <div className="text-right">
          <cite>-Henry Ford <a href="#footnote-1">[1]</a></cite>
        </div>
        <br/>
        
        <p>
        We’ve all heard the (sometimes controversial) quote above. There have been variations of it over the years, but the ultimate meaning is simply that building solutions exactly as you hear them proposed or exactly as you infer them is generally going to 
        lead to poor results.
        </p>
        <p>
        The Web 3.0 spaces (collectively Blockchain-based applications and p2p applications) has over-indexed on trustlessness. The early days of development saw centralization of monetary policy, and eventually centralization of data <a href="#footnote-2">[2]</a> as a problem, 
        and it was inferred that the solution was a completely trustless model for all cases. As a result, more than 10 years after Bitcoin launched, Web 3.0 adoption is still something enterprises are only “considering.” To get enterprises, and general 
        consumers past the “consideration” phase and into the implementation phase, the solution must address the problem. Rather than teach enterprises and end-users about the benefits of a trustless model and hope they will understand and adopt said model, build a hybrid model that solves current problems, slowly exposing them to the benefits you tried to force upon them up front.
        </p>
        <p>
        While other blockchain development tool companies are building solutions that try to create a whole new web that shifts the burden to the end-users, SimpleID is building tools that meet people where they are. SimpleID helps enterprises and individual developers build blockchain and p2p solutions for their customers in a way that remains secure and user-centric without asking 
        customers to adopt a whole new mental model of how the web should work.
        </p>
      </article>
    )
  }
}
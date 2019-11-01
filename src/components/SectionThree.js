import React from 'reactn';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

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
    return(
      <article id="section-three">
        <p><strong>Flaws in Web 3.0’s Market Strategy</strong></p>
        <p>
        Web 3.0 is a decentralized movement, much like the technology powering it. As such, there is no central go to market strategy. However, if you explore the approaches taken by the protocols and the tools built atop those protocols, a market strategy becomes clear. 
        </p>
        <p>
        The strategy we’ve seen over the last 10 years or so is one of hoping people will change in order to adopt the technology. The idea of a whole new web is not that outlandish. Web 2.0 was essentially a whole new web. It was one in which cloud computing replaced physical software disks and physical storage on devices and in data centers. If we were to explore the go to market strategy of Web 2.0, it might have been something along the lines of make it so easy people are begging to switch.
        </p>
        <p>
        The move to cloud computing was not one in which end-users were asked to take on any additional burden. In fact, a burden was lifted from users. They no longer had to keep track of physical disks. They no longer had to buy 500 gigabyte external harddrives and hope they could find the right drivers to connect them to their computers. Web 2.0 offered a solution to problems that clearly existed. Web 2.0 then made it incredibly easy to adopt that solution. 
        </p>
        <p>
        Contrast that with Web 3.0. While there are clear problems with the way user data is managed, a large portion of the world does not care. It does not feel, to them, like they are impacted. Therefore, asking these people to adopt a solution that gives them self-sovereignty and total control is a tough sell even if the solution was easy to adopt. Combine that with the fact that end-users must take on additional cognitive load just to log into an application, and it becomes surprising that anyone has adopted Web 3.0 technology.
        </p>
        <p>
        It doesn’t have to be that way, though.
        </p>
      </article>
    )
  }
}
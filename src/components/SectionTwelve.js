import React from 'reactn';

import Image from 'react-bootstrap/Image';
import tools from '../assets/img/tools.png';

export default class SectionTwelve extends React.Component {
  render() {
    return(
      <article id="section-twelve">
       <p><strong>Conclusion</strong></p>
       <p>
        This paper has outlined how SimpleID has built its solution and it’s touched on why. But to close out the paper, let’s talk strictly about benefits. If you are an enterprise or developer building a blockchain application today, you are looking at building an application that could have upwards of 10-15 dependencies. These dependencies are largely new and evolving pieces of software that need constant updates. 
       </p>
       <p>
        <Image src={tools} rounded fluid />
       </p>
       <p>
        They might include (at minimum):
       </p>
       <ol>
        <li>Setup Infura (or run your own node)</li>
        <li>Matic or Loom for layer2</li>
        <li>Wyre or Simplex for cyrpto payments</li>
        <li>Web3.js or Ethers.js for interacting with the ethereum blockchain</li>
        <li>IPFS</li>
        <li>Pinata or Temporal to ensure IPFS data is always available</li>
        <li>Metamask or Portis for auth</li>
        <li>Mailgun or Sendgrid for user notifications</li>
        <li>HOTP or TOTP for one-time codes for MFA support</li>
        <li>Maintaining all of the above...</li>
       </ol>
       <p>
        By using SimpleID, enterprises and developers can save thousands of dollars per year despite SimpleID being a paid service. The developer hours saved, alone, can result in opportunity cost holes being closed and better utilization of dollars spent on development. 
       </p>
       <p>
        The future is blockchain. The future is Web 3.0. But the future requires development of solutions that consider the needs and desires of end-users rather than forcing upon them solutions that don’t offer clear benefits.
       </p>
      </article>
    )
  }
}
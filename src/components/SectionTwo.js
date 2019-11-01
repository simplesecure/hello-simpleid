import React from 'reactn';

export default class SectionTwo extends React.Component {

  render() {
    return(
      <article id="section-two">
        <p><strong>Web 3.0</strong></p>
        <p>
        What is Web 3.0? There is no truly official definition, but it is essentially the next iteration of the World Wide Web in which the biggest change is that users 
        will have control over their private data and will no longer have to rely on third-party companies to execute computations via the web. “Execute computations” can 
        mean literally anything that’s possible on the web today and the web of the future. 
        </p>
        <p>
        Web 3.0 is made up of blockchain technology and distributed systems. The two are often used synonymously, but they are different. Peer-to-peer technology has been 
        around for decades <a href="#footnote-4">[4]</a>, while blockchain as we know it has only been around for about 10 years <a href="#footnote-5">[5]</a>. These two types of systems can often overlap in 
        the problems they solve, but they also diverge quite frequently. It is possible for a peer-to-peer technology to be intentionally ephemeral, whereas blockchain technology 
        is designed to be a permanent record available to anyone. Consider the Bitcoin blockchain ledger versus Bittorrent. The former has a history of transactions dating all 
        the way back to when the blockchain was launched. The latter will only have copies of data as long as the network is currently sharing copies of that specific piece of data.
        </p>
        <p>
        The technologies used to build Web 3.0 applications today all have shared problems, even if the technologies themselves differ. Those problems include poor user experience, 
        poor documentation, frequent breaking changes, and (surprisingly) poor security <a href="#footnote-6">[6]</a>. It is for these reasons that enterprise have turned to private blockchains and 
        individual developer simply return to building Web 2.0 cloud applications. Private blockchains can offer a significantly better user experience, are generally well-vetted when 
        it comes to security, and are fast <a href="#footnote-7">[7]</a>. But, they break many of the principles of Web 3.0. They are not publicly auditable, control is often totally centralized, and 
        the code itself is often not open source. 
        </p>
        <p>
        The fact that enterprises even consider private blockchains highlight the flaws in Web 3.0’s market strategy, but we will explore those further. 
        </p>
      </article>
    )
  }
}
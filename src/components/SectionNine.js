import React from 'reactn';

export default class SectionNine extends React.Component {
  render() {
    return(
      <article id="section-nine">
       <p><strong>Blockchain Transactions</strong></p>
       <p>
       One of the key friction points for end-users in the Web 3.0 space is the interaction with blockchains and people who aren’t deeply technical. As with the authentication 
       mechanisms present in today’s iteration of Web 3.0, end-users who want to transaction (eg. store data, send tokens, interact with smart contracts) with blockchains must 
       do so via a complicated process that involves writing down and saving their 12- or 24-word seed phrase, using a separate application to proxy those transactions, and 
       waiting long periods of time for transactions to be confirmed.
       </p>
       <p>
       SimpleID improves upon these problems by handling blockchain transaction much the same way we handle authentication. When a user indicates a desire to execute some sort 
       of blockchain transaction, the transaction is stored in SimpleID’s secure database. An estimate of the gas fee (if applicable) is generated on the server and sent to the 
       end user via email along with a token code that can be used to approve the transaction. Should the user provide that token code back to the enterprise or developer’s 
       application, the token code is then validated on SimpleID’s server’s for authenticity, the transaction is loaded from the database, and it is executed on-chain. 
       </p>
       <p>
         DIAGRAM HERE
       </p>
       <p>
       SimpleID allows enterprises and developers to sponsor transactions on behalf of end-users. This simply means that rather than the end-user needing to have cryptocurrency 
       tokens available for payment of fees, the enterprise or developer can pay those fees for the user and the end-user still gets the data ownership and immutability of a blockchain 
       transaction. This is managed via a deep integration with the Gas Station Network  <a href="#footnote-13">[13]</a>. 
       </p>
       <p>
       Additionally, SimpleID provides enterprises and developers a mechanism to ensure higher throughput on blockchain transactions for their end-users via Layer 2 scaling  <a href="#footnote-14">[14]</a>. 
       Via our partnerships with Layer 2 scaling solutions, an enterprise or developer can enable near-instant transaction for their users, creating an experience that mirrors the Web 2.0 
       experience today. 
       </p>
       <p>
       Our solutions for generating, storing, and ultimately broadcasting transactions is one of the more novel approaches in the space. It prevents malicious actors from stealing funds and 
       broadcasting invalid transactions, but at the same time, it improves the user experience significantly. 
       </p>
      </article>
    )
  }
}
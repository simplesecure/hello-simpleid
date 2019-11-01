import React from 'reactn';


export default class SectionEight extends React.Component {
  render() {
    return(
      <article id="section-eight">
        <p><strong>Wallet Management</strong></p>
        <p>
        As a custodial solution, SimpleID provides what is known as hot wallets  <a href="#footnote-10">[10]</a>. However, in following security precedents set by companies like Coinbase  <a href="#footnote-11">[11]</a>, SimpleID creates as non-custodial a solution as possible while being, technically-speaking, custodial. First, let’s explore how wallets are created.
        </p>
        <p>
          DIAGRAM HERE
        </p>
        <p>
        Encompassed in this component is data management. While wallets are generally thought of as a mechanism for storing some sort of financial value, in the Web 3.0 space, they also hold the keys for accessing and decrypting data owned by the individual. Enterprises and developers using SimpleID receive application 
        specific encryption keys that can be used for encrypting and decrypting user generated content and other data. This data can be stored in any number of places, including on the public blockchain. However, it can only be decrypted by the user.
        </p>
        <p>
        For each session initiated by the user, the user-specific and application-specific keypair is generated and returned to the client. The keypairs are unique per user and per application to ensure that an enterprise or developer who acts in bad faith cannot gain access to that user’s other applications and other 
        data that lives outside the application in question. Additionally, SimpleID provides a hosted application that allows end-users the ability to revoke access to any keypairs previously generated. Should an enterprise or developer act in bad faith, the end-user can revoke access, rotate their key  <a href="#footnote-12">[12]</a> for that 
        application, and re-encrypt their data with a new key. 
        </p>
        <p>
          DIAGRAM HERE
        </p>
      </article>
    )
  }
}
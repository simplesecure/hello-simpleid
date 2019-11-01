import React from 'reactn';

export default class SectionTen extends React.Component {
  render() {
    return(
      <article id="section-ten">
       <p><strong>Data Storage</strong></p>
       <p>
       Not all data needs to live on-chain. In fact, many blockchain applications today don’t store all data on-chain. That is both a good thing and a bad thing. 
       It’s a net negative when blockchain applications manage and control large portions of a user’s data. This is a burden on the enterprise or individual 
       developer in the fact that data privacy regulations come into play, and it’s a burden on the user because the data is less portable and more siloed. 
       </p>
       <p>
       SimpleID provides enterprises and developers with a solutions that gives end-users control over their non-blockchain data. There are currently two 
       options available (with more potentially being added in the future). Those options are IPFS and Blockstack. 
       </p>
       <p>
       Through a partnership with Pinata, an IPFS pinning service, enterprises and developers can allow users to store their application data on the IPFS 
       network  <a href="#footnote-15">[15]</a> and ensure that data is always available. Pinning is a necessary part of data availability on IPFS, and SimpleID makes this easy 
       to manage. Through an easy API endpoint or via SDKs, enterprises and developers can let users add and fetch data. 
       </p>
       <p>
       SimpleID also provides enterprises and developers with two full-blown IPFS database solutions: 3Box and Textile. 3Box uses IPFS and runs its own pinning 
       service to ensure data availability. It is great for web applications and makes use of Ethereum addresses for authentication and user validation. Of course, 
       SimpleID’s authentication supports this out of the box. Textile, while also great for web applications, is a little more geared toward mobile and desktop 
       applications. They have built a layer on top of IPFS that includes encryption, access controls, and more.
       </p>
       <p>
       Blockstack uses traditional cloud storage and presents it in a distributed way. Users can use the cloud provider of their choice and still interact with other 
       uses that may use different cloud providers. Most users of Blockstack’s offering do not choose to use their own cloud provider but instead use the default 
       cloud provider Blockstack offers. As of the time of this writing, that default provider offers 25mb limits per individual file uploaded and 100gb limits in 
       aggregate per user. SimpleID supports the default and custom providers natively. 
       </p>
       <p>
       We offer all these data storage solutions without enterprises and developers needing to install multiple dependencies. SimpleID takes care of updates and maintenance. 
       </p>
      </article>
    )
  }
}
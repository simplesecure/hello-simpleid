import React from 'reactn';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import SectionFive from './SectionFive';

export default class SectionOne extends React.Component {

  render() {
    return(
      <div>
        <article id="section-one">
          <h3 className="h2">How It Works</h3>
          <p>
            <img class="img-fluid" src={require('../assets/img/diagram1.svg')} alt="diagram" />
          </p>
          <p>
          There are two main problems enterprises and developers face when building a Web 3.0 business or application today:
          </p>
          <ol>
            <li>The burden of selecting the right tools, building on top of those tools, and keeping those tools updated is incredibly high <a href="#footnote-3">[3]</a>.</li>
            <li>99% of the population does not understand Web 3.0 tech, and if they do, they don’t want to take on user experience debt that has long been solved by Web 1.0 and Web 2.0. </li>
          </ol>
          <p>
          Despite these being well-documented problems (footnote), the protocols enabling decentralization continue to be complex and focused entirely on niche developers. The development tools built on top of these protocols are not much better in terms of approach. These tools focus on niche developers and ask those developers to pass along significant burden to their end-users. To understand the available market of blockchain/p2p developer tools, 
          we must first take a look at the Web 3.0 landscape. 
          </p>
        </article>
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
      </div>
    )
  }
}
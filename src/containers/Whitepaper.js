import React from 'reactn';
import IntroSection from '../components/IntroSection';
import EtherInfo from '../components/EtherInfo';
import Sections from '../containers/Sections';

export default class Whitepaper extends React.Component {
  render() {
    const { balance } = this.global;
    return (
      <div className="page">
        <IntroSection />
        <EtherInfo />
        {
          balance && balance > 0 ? 
          <Sections /> : 
          <div />
        }
      </div>
    )
  }
}
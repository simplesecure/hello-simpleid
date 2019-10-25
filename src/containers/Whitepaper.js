import React from 'reactn';
import IntroSection from '../components/IntroSection';
import EtherInfo from '../components/EtherInfo';
import Sections from '../containers/Sections';

export default class Whitepaper extends React.Component {
  render() {
    return (
      <div className="page">
        <IntroSection />
        <EtherInfo /> 
        <Sections />
      </div>
    )
  }
}
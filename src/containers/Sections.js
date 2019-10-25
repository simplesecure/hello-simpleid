import React from 'reactn';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import SectionFour from '../components/SectionFour';
import SectionFive from '../components/SectionFive';
import UnlockSection from '../components/UnlockSection.js';
import { fetchContract } from '../actions/whitepaper';

export default class Sections extends React.Component {

  async componentDidMount() {
    fetchContract();
  }
  renderSections() {
    const { sectionsUnlocked } = this.global;

    switch (sectionsUnlocked) {
      case 0: 
        return (
          <div className="page">
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={1} />
          </div>
        )
      case 1: 
        return (
          <div className="page">
            <SectionOne />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={2} />
          </div>
        )
      case 2: 
        return (
          <div className="page">
            <SectionOne />
            <SectionTwo />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={3} />
          </div>
        )
      case 3: 
        return (
          <div className="page">
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={4} />
          </div>
        )
      case 4: 
        return (
          <div className="page">
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 5: 
        return (
          <div className="page">
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
          </div>
        )
      default: 
        return (
          <div className="page">
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={1} />
          </div>
        )
    }

  }

  render() {
    return this.renderSections()
  }
}
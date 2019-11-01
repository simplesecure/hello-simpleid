import React from 'reactn';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import SectionFour from '../components/SectionFour';
import SectionFive from '../components/SectionFive';
import SectionSix from '../components/SectionSix';
import SectionSeven from '../components/SectionSeven';
import SectionEight from '../components/SectionEight';
import SectionNine from '../components/SectionNine';
import SectionTen from '../components/SectionTen';
import SectionEleven from '../components/SectionEleven';
import SectionTwelve from '../components/SectionTwelve';
import SectionMap from '../components/SectionMap';
import UnlockSection from '../components/UnlockSection.js';
import IntroSection from '../components/IntroSection';
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
          <div>
            <IntroSection />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={1} />
          </div>
        )
      case 1: 
        return (
          <div>
            <IntroSection />
            <SectionOne />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={2} />
          </div>
        )
      case 2: 
        return (
          <div>
            <IntroSection />
            <SectionOne />
            <SectionTwo />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={3} />
          </div>
        )
      case 3: 
        return (
          <div>
            <IntroSection />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={4} />
          </div>
        )
      case 4: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 5: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 6: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 7: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <SectionSeven />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 8: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <SectionSeven />
            <SectionEight />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 9: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <SectionSeven />
            <SectionEight />
            <SectionNine />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 10: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <SectionSeven />
            <SectionEight />
            <SectionNine />
            <SectionTen />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 11: 
        return (
          <div>
            <IntroSection />
              
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <SectionSeven />
            <SectionEight />
            <SectionNine />
            <SectionTen />
            <SectionEleven />
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={5} />
          </div>
        )
      case 12: 
        return (
          <div>
            <IntroSection />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <SectionSeven />
            <SectionEight />
            <SectionNine />
            <SectionTen />
            <SectionEleven />
            <SectionTwelve />
          </div>
        )
      default: 
        return (
          <div>
            <IntroSection />
              
            <UnlockSection sectionsUnlocked={sectionsUnlocked} nextSection={1} />
          </div>
        )
    }

  }

  render() {
    return(
      <section>
        <div className="container">
          <div className="row align-items-start justify-content-around">
            <SectionMap />
            <div class="col-xl-7 col-lg-8 col-md-9">
              {this.renderSections()}
            </div>
          </div>
        </div>
      </section>
    ) 
  }
}
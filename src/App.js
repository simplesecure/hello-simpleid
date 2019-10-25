import React, { setGlobal } from 'reactn';
import Whitepaper from './containers/Whitepaper';
import Banner from './components/Banner';
import Auth from './containers/Auth';

export default class App extends React.Component {
  async componentDidMount() {
    const { simple } = this.global;
    const isSignedIn = simple.getUserData() ? true :  false;
    if(isSignedIn) {
      const provider = simple.simpleWeb3().getDefaultProvider('ropsten');
      const address = simple.getUserData().wallet.ethAddr;
      setGlobal({ address });

      const balance = await provider.getBalance(address);
      const etherBal = simple.simpleWeb3().utils.formatEther(balance);
      setGlobal({ balance: etherBal });
    }
  }

  render() {
    const { userSession } = this.global;
    return (
      <div>
        <Banner />
        {
          userSession.isUserSignedIn() ? 
          <Whitepaper /> : 
          <Auth />
        }
      </div>
    )
  }
}
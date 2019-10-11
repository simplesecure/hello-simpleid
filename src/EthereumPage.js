import React from 'react';
//import { createContract, fetchContract } from 'simpleid-js-sdk';
import { simpleIDKeys } from './keys';
const abi = [
  "event ValueChanged(address indexed author, string oldValue, string newValue)",
  "constructor(string value)",
  "function getValue() view returns (string value)",
  "function setValue(string value)"
];
const bytecode = "0x608060405234801561001057600080fd5b506040516105bd3803806105bd8339" +
"8101604081815282518183526000805460026000196101006001841615020190" +
"91160492840183905293019233927fe826f71647b8486f2bae59832124c70792" +
"fba044036720a54ec8dacdd5df4fcb9285919081906020820190606083019086" +
"9080156100cd5780601f106100a2576101008083540402835291602001916100" +
"cd565b820191906000526020600020905b815481529060010190602001808311" +
"6100b057829003601f168201915b505083810382528451815284516020918201" +
"9186019080838360005b838110156101015781810151838201526020016100e9" +
"565b50505050905090810190601f16801561012e578082038051600183602003" +
"6101000a031916815260200191505b5094505050505060405180910390a28051" +
"610150906000906020840190610157565b50506101f2565b8280546001816001" +
"16156101000203166002900490600052602060002090601f0160209004810192" +
"82601f1061019857805160ff19168380011785556101c5565b82800160010185" +
"5582156101c5579182015b828111156101c55782518255916020019190600101" +
"906101aa565b506101d19291506101d5565b5090565b6101ef91905b80821115" +
"6101d157600081556001016101db565b90565b6103bc806102016000396000f3" +
"0060806040526004361061004b5763ffffffff7c010000000000000000000000" +
"0000000000000000000000000000000000600035041663209652558114610050" +
"57806393a09352146100da575b600080fd5b34801561005c57600080fd5b5061" +
"0065610135565b60408051602080825283518183015283519192839290830191" +
"85019080838360005b8381101561009f57818101518382015260200161008756" +
"5b50505050905090810190601f1680156100cc57808203805160018360200361" +
"01000a031916815260200191505b509250505060405180910390f35b34801561" +
"00e657600080fd5b506040805160206004803580820135601f81018490048402" +
"8501840190955284845261013394369492936024939284019190819084018382" +
"80828437509497506101cc9650505050505050565b005b600080546040805160" +
"20601f6002600019610100600188161502019095169490940493840181900481" +
"0282018101909252828152606093909290918301828280156101c15780601f10" +
"610196576101008083540402835291602001916101c1565b8201919060005260" +
"20600020905b8154815290600101906020018083116101a457829003601f1682" +
"01915b505050505090505b90565b604080518181526000805460026000196101" +
"00600184161502019091160492820183905233927fe826f71647b8486f2bae59" +
"832124c70792fba044036720a54ec8dacdd5df4fcb9285918190602082019060" +
"60830190869080156102715780601f1061024657610100808354040283529160" +
"200191610271565b820191906000526020600020905b81548152906001019060" +
"200180831161025457829003601f168201915b50508381038252845181528451" +
"60209182019186019080838360005b838110156102a557818101518382015260" +
"200161028d565b50505050905090810190601f1680156102d257808203805160" +
"01836020036101000a031916815260200191505b509450505050506040518091" +
"0390a280516102f49060009060208401906102f8565b5050565b828054600181" +
"600116156101000203166002900490600052602060002090601f016020900481" +
"019282601f1061033957805160ff1916838001178555610366565b8280016001" +
"0185558215610366579182015b82811115610366578251825591602001919060" +
"01019061034b565b50610372929150610376565b5090565b6101c991905b8082" +
"1115610372576000815560010161037c5600a165627a7a723058202225a35c50" +
"7b31ac6df494f4be31057c7202b5084c592bdb9b29f232407abeac0029";

export default class EthereumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    }
  }

  deployContract = async (e) => {
    e.preventDefault();
    const { userSession } = this.props;
    const password = document.getElementById('password-input').value;
    if(password) {
      document.getElementById('password-error').style.display = "none";
      const params = {
        username: userSession.loadUserData().username,
        password,
        devId: simpleIDKeys().devId,
        apiKey: simpleIDKeys().apiKey,
        abi,
        bytecode
      }
      document.getElementById('growl').style.display = "block";
      document.getElementById('growl-p').innerText = "Deploying contract...";
      const contract = {}//await createContract(params);
      console.log(contract);
      if(contract.message === "failed to create contract") {
        document.getElementById('growl').style.display = "block";
        document.getElementById('growl-p').innerText = "Trouble deploying...";
      } else {
        document.getElementById('growl').style.display = "block";
        document.getElementById('growl-p').innerText = "Contract deployed!";
      }
      setTimeout(() => {
        document.getElementById('growl').style.display = "none";
        document.getElementById('growl-p').innerText = "";
      }, 2000)
    } else {
      document.getElementById('password-error').style.display = "block";
    }
  }

  fetchContractFromEth = async (e) => {
    e.preventDefault();
    const params = {
      contractAddress: "0x4f7DE17889C29c9F2482B017d467a481cE3376C0",
      devId: simpleIDKeys().devId,
      apiKey: simpleIDKeys().apiKey,
      abi,
    }
    document.getElementById('growl').style.display = "block";
    document.getElementById('growl-p').innerText = "Fetching contract...";
    const contract = {}//await fetchContract(params);
    console.log(contract);
    if(contract.message === "retreived contract and executed") {
      document.getElementById('growl').style.display = "block";
      document.getElementById('growl-p').innerText = "Found contract!";
    } else {
      document.getElementById('growl').style.display = "block";
      document.getElementById('growl-p').innerText = "Trouble fetching...";
    }
    setTimeout(() => {
      document.getElementById('growl').style.display = "none";
      document.getElementById('growl-p').innerText = "";
    }, 2000)
    this.setState({ result: contract.body });
  }

  render() {
    const { userSession } = this.props;
    const { result } = this.state;
    return (
      <div>
        <form className="form">
          <h1 style={{marginBottom: "15px", color: "#809eff"}}>Hello, {userSession.loadUserData().username}</h1>
          <h2 style={{marginBottom: "35px", color: "#809eff"}}>Test deploying and fetching/executing a smart contract on Ethereum</h2>
          <textarea disabled value={abi}></textarea><br/>
          <label style={{color: "#809eff"}}>Sample Contract</label>
          <br/>
          <div>
            <h3 style={{color: "#809eff", marginTop: "25px"}}>Your Ethereum testnet address is <code>{userSession.loadUserData().wallet.ethAddr}</code>.</h3>
            <h3 style={{color: "#809eff", marginTop: "25px"}}>You'll need to use a testnet faucet <a href="https://faucet.ropsten.be/" target="_blank" rel="noopener noreferrer">like this one</a> to fund it before you can test the deploy contract function.</h3>
          </div>
          <p style={{color: "#809eff"}}>Enter your password then click "Deploy Contract" when you're ready to deploy it.</p>
          <div style={{margin: "25px"}}>
            <input type="password" id="password-input" placeholder="password"/><br/>
            <label style={{color: "#809eff"}}>Password</label><br/>
          </div>
          <button className="on-white" style={{marginTop: "15px"}} onClick={this.deployContract}>Deploy Contract</button>
          <p id="password-error" style={{ display: "none", color: "red" }}>Please make sure you enter your correct account password.</p>
          <br/>
          <button className="on-white" style={{marginTop: "15px"}} onClick={this.fetchContractFromEth}>Execute Contract</button>

        </form>
        <div style={{marginTop: "20px"}}>
          <h3>The result of the executed contract will be displayed below.</h3>
          <div style={{marginTop: "20px"}}>
            <h1 style={{color: "#809eff"}}>{result}</h1>
          </div>
        </div>
      </div>
    )
  }
}

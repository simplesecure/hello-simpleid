import React from 'react';

import { WiredCheckbox } from "wired-checkbox"

const request = require('request-promise');
let bytecode = require('./contracts/TodoList.json').bytecode;
let abi = require('./contracts/TodoList.json').abi;
const Web3 = require('web3');
const {simpleIDKeys} = require('./keys');

let contractAddress = "0xb7916f9D6587441A7af652fD1378E892CA67d331";
let ropContractAddress = "0x13127a8969099dB949f63a264B02d6F6B3a61081";
let network = "ropsten";
const infuraKey = "b8c67a1f996e4d5493d5ba3ae3abfb03";

const provider = new Web3.providers.HttpProvider(network === "local" ? 'http://localhost:7545' : `https://${network}.infura.io/v3/${infuraKey}`);
var web3 = new Web3(provider);
web3.eth.net.isListening()
   .then(() => console.log('web3 is connected'))
   .catch(e => console.log('Wow. Something went wrong'));
let headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
web3.eth.getAccounts().then(console.log)
//const account1 = "0xe9CF9486ECf63bdA487B64698085A51392f42081"; //Fetch this from the user session object
let account1;

export default class EthereumTodoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      gas: 0,
      showGas: false,
      loading: true,
      newTaskContent: "",
      payload: {},
      password: "",
      simpleIDContract: "0x6d87224fd2837738235Fb6D0F3a422F95bEa16Ac",
      yourContractAddress: "",
      customAddress: "",
      contractApproval: false,
      error: "",
      username: JSON.parse(localStorage.getItem('blockstack-session')).userData.username,
      basicDemo: true
    }
  }

  componentDidMount() {
    account1 = JSON.parse(localStorage.getItem('blockstack-session')) ? JSON.parse(localStorage.getItem('blockstack-session')).userData.wallet.ethAddr : "";
    const yourContractAddress = sessionStorage.getItem('your_contract_address') || "";
    this.setState({ yourContractAddress, customAddress: yourContractAddress });
    this.fetchContract();
  }

  handleBasicDemoToggle = () => {
    this.setState({basicDemo: !this.state.basicDemo})
  }

  handleCopyElementById = (anElementId) => {
    try {
      const copyElement = document.getElementById(anElementId)

      // TODO: refactor to utils
      // https://stackoverflow.com/questions/49328382/browser-detection-in-reactjs
      const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
      // Chrome (https://stackoverflow.com/questions/47879184/document-execcommandcopy-not-working-on-chrome)
      if (isChrome) {
        const selection = document.getSelection()
        const range = document.createRange()
        range.selectNode(copyElement)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        // Safari etc. (https://www.w3schools.com/howto/howto_js_copy_clipboard.asp)
        copyElement.select()
        copyElement.setSelectionRange(0, 99999)   // For mobile
      }
      document.execCommand('copy')
      console.log(`Copied to clipbboard: ${copyElement.value}`)
    } catch (suppressedError) {
      console.log(suppressedError)
    }
  }

  handleAddrChange = (e) => {
    this.setState({ customAddress: e.target.value });
  }

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  estimateGas = async (data) => {
    this.setState({ error: "" });
    console.log(data);
    const address = network === "local" ? contractAddress : ropContractAddress;
    let contract = new web3.eth.Contract(abi, address);
    const myData = contract.methods[data.updates.functionName](data.updates.value).encodeABI();
    let estimate;
    web3.eth.getTransactionCount(account1, async (err, txCount) => {
      try {
        // Build the transaction
        const txObject = {
          from: account1,
          nonce:    web3.utils.toHex(txCount),
          to:       address,
          value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
          gasLimit: web3.utils.toHex(2100000),
          gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
          data: myData
        }
        estimate = await web3.eth.estimateGas(txObject);
        this.setState({ showGas: true, gas: estimate });

      } catch (error) {
          console.log(error);
      }
    });
  }

  deployContract = async() => {
    console.log('deployContract ######### 1')
    this.setState({ error: "" });
    const payload = {
      abi,
      bytecode,
      network
    }

    console.log('deployContract ######### 2')
    this.setState({payload});
    let estimate;
    console.log('deployContract ######### 3')
    web3.eth.getTransactionCount(account1, async (err, txCount) => {
      try {
        console.log('deployContract ######### 4')
        // Build the transaction
        const txObject = {
          from: account1,
          nonce:    web3.utils.toHex(txCount),
          value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
          gasLimit: web3.utils.toHex(2100000),
          gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
          data: bytecode
        }
        console.log('deployContract ######### 5')
        estimate = await web3.eth.estimateGas(txObject);
        console.log('deployContract ######### 6')
        this.setState({ showGas: true, gas: estimate, contractApproval: true });
        console.log('deployContract ######### 7')
      } catch (error) {
          console.log(error);
      }
    });
    console.log('deployContract ######### out')
  }

  fetchContract = async (custom) => {
    this.setState({ error: "", loading: true });
    const { customAddress } = this.state;
    let address = custom ? customAddress : network === "local" ? contractAddress : ropContractAddress;
    let tasksArr = [];

    ///////WEB3JS CODE//////
    let contract = new web3.eth.Contract(abi, address);
    const taskCount = await contract.methods.taskCount().call();
    const count = JSON.parse(taskCount);
    const localTaskCount = JSON.parse(localStorage.getItem('task-count')) || 0;
    const localTask = JSON.parse(localStorage.getItem('new-task')) || {};
    var i;
    for (i = 1; i < count + 1; i++) {
      let task = await contract.methods.tasks(i).call();
      const taskObj = {
        id: task[0],
        content: task[1],
        completed: task[2]
      }
      console.log(taskObj)
      tasksArr.push(taskObj);
      this.setState({tasks: tasksArr})
    }
    //  If the tx hasn't been mined yet
    if (count < localTaskCount) {
      console.log("Awaiting tx mining...");
      localTask.id = JSON.stringify(localTask.id);
      console.log(localTask)
      tasksArr.push(localTask);
      this.setState({ tasks: tasksArr});
    }
    this.setState({ loading: false });
  }

  handleRefreshCall = async (custom=undefined) => {
    document.getElementById('growl').style.display = "flex";
    document.getElementById('growl-p').innerText = `Refreshing from contract.`;
    let tasks = await this.fetchContractNoUI()
    document.getElementById('growl').style.display = "none";
    document.getElementById('growl-p').innerText = ``;
    this.setState({tasks})
  }

  // Grab the state of tasks before any change.
  // If the transaction is approved, when loading is complete and we are done,
  // monitor in a loop, every n seconds to see if the tasks returned from
  // fetch contract differ from the state before the change. If so,
  // push a growl to the user that the contract is mined.
  pollEthereumForMiningComplete = async (iteration=0) => {
    const POLL_DELAY = 3000

    console.log(`DBG::pollEthereumForMiningComplete: ${iteration}`)

    if (iteration < 5) {
      document.getElementById('growl').style.display = "flex";
      document.getElementById('growl-p').innerText = `Polling contract ${iteration}`;

      await setTimeout(
        async () => {
          const tasksArr = await this.fetchContractNoUI()
          console.log(`Local: ${JSON.stringify(this.state.tasks)}`)
          console.log(`Contr: ${JSON.stringify(tasksArr)}`)
          iteration++
          this.pollEthereumForMiningComplete(iteration)
        },
        POLL_DELAY
      )
    } else {
      await this.fetchContract()
      document.getElementById('growl').style.display = "none";
      document.getElementById('growl-p').innerText = '';
    }
  }


  fetchContractNoUI = async (custom) => {
    const { customAddress } = this.state;
    let address = custom ? customAddress : network === "local" ? contractAddress : ropContractAddress;
    let tasksArr = [];

    ///////WEB3JS CODE//////
    let contract = new web3.eth.Contract(abi, address);
    const taskCount = await contract.methods.taskCount().call();
    const count = JSON.parse(taskCount);

    for (let i = 1; i < count + 1; i++) {
      let task = await contract.methods.tasks(i).call();
      const taskObj = {
        id: task[0],
        content: task[1],
        completed: task[2]
      }
      console.log(taskObj)
      tasksArr.push(taskObj);
    }

    return tasksArr
  }

  newTask = async () => {
    this.setState({ error: "" });
    const { newTaskContent, customAddress } = this.state;
    const updates = {
      functionName: "createTask",
      value: newTaskContent
    }
    const payload = {
      abi,
      contractAddress: customAddress ? customAddress : network === "local" ? contractAddress: ropContractAddress,
      updates,
      network
    }

    this.setState({ payload });
    this.estimateGas(payload);
  }

  toggleTask = (id) => {
    this.setState({ error: "" });
    const { tasks, customAddress } = this.state;
    let thisTask = tasks[id-1];
    thisTask.completed = !thisTask.completed;
    const updates = {
      functionName: "toggleCompleted",
      value: id
    }
    const payload = {
      abi,
      contractAddress: customAddress ? customAddress : network === "local" ? contractAddress: ropContractAddress,
      updates,
      network
    }

    this.setState({ payload });
    this.estimateGas(payload);
  }

  approveTransaction = () => {
    this.setState({ error: "" });
    const { payload, tasks, contractApproval, customAddress, username, password } = this.state;
    payload.password = password;
    payload.username = username;
    payload.devId = process.env.NODE_ENV === "production" ? simpleIDKeys().devId : "imanewdeveloper";
    payload.development = process.env.NODE_ENV === "production" ? false : true;
    headers['Authorization'] = process.env.NODE_ENV === "production" ? simpleIDKeys().apiKey : "-LmCb96-TquOlN37LpM0";
    if(password) {
      if(contractApproval) {
        this.setState({ loading: true, showGas: false, gas: 0, contractApproval: false });
        const options = { url: 'https://i7sev8z82g.execute-api.us-west-2.amazonaws.com/dev/createContract', method: 'POST', headers: headers, body: JSON.stringify(payload) };
        return request(options)
        .then(async (body) => {

          // POST succeeded...
          let contract = JSON.parse(body);
          sessionStorage.setItem('your_contract_address', contract.address);
          this.setState({ loading: false, yourContractAddress: contract.address, customAddress: contract.address });
          console.log(contract);
        })
        .catch(error => {
          // POST failed...
          console.log('ERROR: ', error)
          this.setState({ error, loading: false });
        });
      } else {
        this.setState({ newTaskContent: "", gas: 0, showGas: false, loading: true });
        const options = { url: 'https://i7sev8z82g.execute-api.us-west-2.amazonaws.com/dev/sendTransaction', method: 'POST', headers: headers, body: JSON.stringify(payload) };
        return request(options)
        .then(async (body) => {
          if(JSON.parse(body).success === true) {
            //Setting the task locally because testnet and mainet tx take a while
            const newTask = {
              id: tasks.length + 1,
              content: payload.updates.value,
              complete: false
            }
            localStorage.setItem('new-task', JSON.stringify(newTask));
            tasks.push(newTask);
            localStorage.setItem('task-count', JSON.stringify(tasks.length));
            this.setState({ tasks });
          } else {
            //There was an error
            console.log(JSON.parse(body));
          }
          this.setState({ payload: {} });
          if(customAddress) {
            this.fetchContract(true);
          } else {
            // Attempt at a polling alg.
            // The amount of time can be too much though.
            // this.setState({ loading: false });
            // console.log('POST to createContract succeeded, calling pollEthereumForMiningComplete...')
            // this.pollEthereumForMiningComplete()
            this.fetchContract();
          }

        })
        .catch(error => {
          // POST failed...
          this.setState({ loading: false });
          console.log('ERROR: ', error);
        });
      }
    } else {
      //Password required
      this.setState({ error: "Password required" })
    }
  }

  rejectTransaction = () => {
    this.setState({ showGas: false, gas: 0, payload: {}, newTaskContent: "" });
  }

  handleChange = (e) => {
    this.setState({newTaskContent: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  renderLoading() {
    return (
      <div>
        <h2 className='instruction-text'>Processing...</h2>
        <br />
        <h2  className='instruction-text'>Do not refresh your page. If deploying or updating a contract, this may take up to a few minutes.</h2>
      </div>
    )
  }

  renderGasEstimateApproval(gas, password, error) {
    return (
      <div>
        <h3 className='instruction-text'>This transaction requires {gas} gas.</h3>
        <h3 className='instruction-text'> Enter your SimpleID password and click 'Accept' to approve this transaction.</h3>
        <input type="password" id="password" value={password} onChange={this.handlePassword} placeholder="SimpleID Password" required />
        <button className='center-form-button on-white approve-button' onClick={this.approveTransaction}>Approve</button>
        <button className='center-form-button on-white reject-button' onClick={this.rejectTransaction}>Reject</button>
        <span style={{color: "red"}}>{error}</span>
      </div>
    )
  }

  renderInstructionsForm( account1,
                          simpleIDContract,
                          yourContractAddress,
                          error,
                          customAddress,
                          newTaskContent,
                          tasks,
                          basicDemo) {
    if (basicDemo) {
      // TODO: refactor to utils
      // https://stackoverflow.com/questions/49328382/browser-detection-in-reactjs
      const isFirefox = typeof InstallTrigger !== 'undefined';
      const copyPasteBox = (isFirefox) ?
        <input className='display-copyable-input' id='ethereum-address' value={account1} type="text" /> :
        <input className='display-copyable-input' disabled id='ethereum-address' value={account1} type="text" />

      return (
        <div>
          <h3 className='instruction-text'>Step 1. Copy your Ethereum Address:</h3>
          <div style={{display:'flex', flexDirection:'row'}}>
            <button
              style={{width:'auto', marginRight:2, padding:10}}
              className="center-form-button on-white"
              onClick={() => this.handleCopyElementById('ethereum-address')}>Copy</button>
            {/*<div
              style={{marginLeft:2}}
              className='display-text-scroll-x'> */}
              {/*<p id='ethereum-address' style={{color: "#809eff"}}>{account1}</p>*/}
              {copyPasteBox}
            {/*</div>*/}
          </div>

          <h3 className='instruction-text'>Step 2. Use it to get Eth here:</h3>
          <h4 style={{color:"#809eff"}}>(Paste the address from step 1 on this page)</h4>
          <div className='display-text-scroll-x'>
            <a href="https://faucet.ropsten.be" target="_blank" rel="noreferrer noopener">https://faucet.ropsten.be</a>
          </div>

          <h3 className='instruction-text'>Step 3. Check that the Eth got mined:</h3>
          <h4 style={{color:"#809eff"}}>(You'll see more than 0 Eth in a few mins.)</h4>
          <div className='display-text-scroll-x'>
            <a href={`https://ropsten.etherscan.io/address/${account1}`} target="_blank" rel="noreferrer noopener">{`https://ropsten.etherscan.io/address/${account1}`}</a>
          </div>

          <h3 className='instruction-text'>In this demo, the smart contract holds Todo list items. We'll use SimpleID's smart contract address:</h3>
          <div className='display-text-scroll-x'>
            <p style={{color: "#809eff"}}>{simpleIDContract}</p>
          </div>

          <h3 className='instruction-text'>Step 4. Add tasks to the Todo list using the edit field and button below:</h3>
          <input value={newTaskContent} onChange={this.handleChange} placeholder="Type a task here ..." type="text" />
          <button className="center-form-button on-white" onClick={this.newTask}>Add Task</button>


          <div className='todoList'>
            <h2
              style={{marginTop:5, marginBottom:10}}
              className='instruction-text'>Your Ethereum Todo List:</h2>

            <div className="todos">
              {
                tasks.map((task) => {
                  const eleCheckbox = task.completed ?
                    ( <wired-checkbox checked onClick={() => this.toggleTask(task.id)} /> ) :
                    ( <wired-checkbox onClick={() => this.toggleTask(task.id)} /> )

                  const eleTaskText = task.completed ?
                    ( <div style={{display:'flex', flex:1, marginLeft:5, textDecoration: "line-through"}}>{task.content}</div> ) :
                    ( <div style={{display:'flex', flex:1, marginLeft:5, textDecoration: "none"}}>{task.content}</div> )

                  return (
                    <div key={task.id}
                         style={{ display:'flex',
                                  flexDirection:'row',
                                  alignItems: 'center',
                                  justifyContent: 'flex-start'}}>
                      {eleCheckbox}
                      {eleTaskText}
                    </div>
                  )
                })
              }
            </div>
          </div>

          <h3 className='instruction-text'>Step 5. Refresh until your changes appear.</h3>
          <h4 style={{color:"#809eff"}}>(It can take up to 3 minutes for mining.)</h4>
          <button className="center-form-button on-white" onClick={() => this.handleRefreshCall()}>Refresh (Fetch Contract)</button>
        </div>
      )
    } else {
      // ADVANCED
      return (
        <div>
          <h3 className='instruction-text'>1. Copy your Ethereum Address:</h3>
          <div className='display-text-scroll-x'>
            <p style={{color: "#809eff"}}>{account1}</p>
          </div>

          <h3 className='instruction-text'>2. Use your copied Ethereum address to get some Ether at this link:&nbsp;
            <a href="https://faucet.ropsten.be/" target="_blank" rel="noreferrer noopener">here</a>.
          </h3>

          <h3 className='instruction-text'>3. In this demo, the smart contract holds Todo list items. You can use SimpleID's default contract address:</h3>
          <div className='display-text-scroll-x'>
            <p style={{color: "#809eff"}}>{simpleIDContract}</p>
          </div>
          <h3>Or you can deploy your own smart contract below and use it's address:</h3>
          <button className="center-form-button on-white" onClick={this.deployContract}>Deploy Your Contract</button>
          <div className='display-text-scroll-x'>
            <p style={{color: "#809eff"}}>{yourContractAddress ? yourContractAddress : "Fund your Ethereum Testnet (ropsten) address, and then click deploy"}</p>
          </div>
          <p>{error}</p>

          <h3 className='instruction-text'>4. Now fetch your smart contract to populate the Todo list display:</h3>
          <input value={customAddress} onChange={this.handleAddrChange} placeholder="Your contract address" type="text" />
          <button className="center-form-button on-white" onClick={() => this.fetchContract(true)}>Fetch Your Contract</button>

          <h3 className='instruction-text'>5. Use the input field and button below to add items to your Todo list:</h3>
          <input value={newTaskContent} onChange={this.handleChange} placeholder="A task ..." type="text" />
          <button className="center-form-button on-white" onClick={this.newTask}>Add Task</button>

          <h2 className='instruction-text'>Your Todo List:</h2>

          <div className="todos" style={{display:'flex', flexDirection:'column'}}>
            {
              tasks.map((task) => {
                return (
                  <div key={task.id}
                       style={{ display:'flex',
                                flexDirection:'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start'}}>
                    <input style={{display:'flex', flex:0}} type="checkbox" onChange={() => this.toggleTask(task.id)} checked={task.completed} />
                    <div style={task.completed ? {display:'flex', flex:1, textDecoration: "strikethrough"} : {display:'flex', flex:1, textDecoration: "none"}}>{task.content}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  render() {
    const { userSession } = this.props;
    const { error,
            customAddress,
            simpleIDContract,
            yourContractAddress,
            tasks,
            gas,
            showGas,
            loading,
            newTaskContent,
            password,
            basicDemo } = this.state;

    const formContent =
      loading ?
        this.renderLoading() :
      showGas ?
        this.renderGasEstimateApproval(gas, password, error) :
        this.renderInstructionsForm(
          account1, simpleIDContract, yourContractAddress, error, customAddress, newTaskContent, tasks, basicDemo)

    let title = 'Basic Ethereum Todo List'
    let switchInstruction = 'Now you can try the advanced demo, which involves deploying your own smart contract to the Ropsten Ethereum testnet:'
    let switchButtonTxt = 'Switch to Advanced'
    if (!basicDemo) {
      title = 'Advance Ethereum Todo List'
      switchInstruction = 'You can go back to the basic demo, which uses SimpleID\'s own smart contract to store the Todo list data.'
      switchButtonTxt = 'Switch to Basic'
    }

    return (
      <form
        onSubmit={this.handleSubmit}
        style={{color: '#809eff', textAlign:'left', overflowX:'hidden', width:'100%'}}
        className="form">

        <h2 style={{color: "#809eff"}}>{title}</h2>
        <h4 style={{color: "#809eff", fontStyle:'italic'}}>A terrible use of the Blockchain, but a great demo of SimpleID's simplicity.</h4>
        {formContent}

        { /* Disabling for now. TODO: re-enable later this week.
        <h4 className='instruction-text'>{switchInstruction}</h4>
        <button className="center-form-button on-white" onClick={this.handleBasicDemoToggle}>{switchButtonTxt}</button>
        */ }
      </form>
    );
  }
}

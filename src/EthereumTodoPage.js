import React from 'react';

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
      username: JSON.parse(localStorage.getItem('blockstack-session')).userData.username
    }
  }

  componentDidMount() {
    account1 = JSON.parse(localStorage.getItem('blockstack-session')) ? JSON.parse(localStorage.getItem('blockstack-session')).userData.wallet.ethAddr : "";
    const yourContractAddress = sessionStorage.getItem('your_contract_address') || "";
    this.setState({ yourContractAddress, customAddress: yourContractAddress });
    this.fetchContract();
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
    // debugger
    web3.eth.getTransactionCount(account1, async (err, txCount) => {
      try {
        // debugger
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
    //If the tx hasn't been mined yet
    if(count < localTaskCount) {
      console.log("Awaiting tx mining...");
      localTask.id = JSON.stringify(localTask.id);
      console.log(localTask)
      tasksArr.push(localTask);
      this.setState({ tasks: tasksArr});
    }
    this.setState({ loading: false });
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
            password } = this.state;

    console.log(`render: loading=${loading}, showGas=${showGas}, yourContractAddress=${yourContractAddress}, customAddress=${customAddress}`)

    const formContent =
            loading ?
            (<div>
              <h1>Loading...</h1>
              <p>Do not refresh your page. If deploying a contract, this may take up to a few minutes.</p>
            </div>) :
            showGas ?
            (<div>
              <p>This transaction requires {gas} gas. Approve transaction?</p>
              <input type="password" id="password" value={password} onChange={this.handlePassword} placeholder="password" required />
              <button onClick={this.approveTransaction}>Approve</button>
              <button onClick={this.rejectTransaction}>Reject</button>
              <span style={{color: "red"}}>{error}</span>
            </div>) :
            (
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
                {/*<h4>Need some ether? Get it <a href="https://faucet.ropsten.be/" target="_blank" rel="noreferrer noopener">here</a></h4>
                <p>Your Ethereum Address: <code style={{background: "#eee", padding: "3px"}}>{account1}</code></p>
                <p>SimpleID Default Contract Address: <code style={{background: "#eee", padding: "3px"}}>{simpleIDContract}</code></p>
                <p>Your Contract Address: <code style={{background: "#eee", padding: "3px"}}>{yourContractAddress ? yourContractAddress : "Fund your Ethereum Testnet (ropsten) address, and then click deploy"}</code></p>
                <p>{error}</p>
                <div><button onClick={this.deployContract}>Deploy Your Smart Contract</button></div>
                <div style={{display:'flex', flexDirection:'row'}}><input type="text" value={customAddress} onChange={this.handleAddrChange} placeholder="Your contract address" /><button onClick={() => this.fetchContract(true)}>Fetch Your Contract</button></div> */}
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
                {/*<div style={{display:'flex', flexDirection:'row'}}>
                    <input type="text" value={newTaskContent} onChange={this.handleChange} placeholder="new task" />
                    <button onClick={this.newTask}>New Task</button>
                  </div>*/}
                </div>
              </div>
            )

    return (
      <form onSubmit={this.handleSubmit} style={{color: '#809eff', textAlign:'left', overflowX:'hidden', width:'100%'}} className="form">
        <h2 style={{color: "#809eff"}}>Ethereum ToDo List</h2>
        <h4 style={{color: "#809eff", fontStyle:'italic'}}>A terrible use of the Blockchain, but a great demo of SimpleID's simplicity.</h4>
        {formContent}
      </form>
    );
  }
}

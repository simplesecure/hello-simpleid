import { getGlobal, setGlobal } from 'reactn';
import { abi } from '../compiledContracts/WhitePaper.json';

export async function fetchContract() {
  const { contractAddress, simple } = getGlobal();
  const address = simple.getUserData().wallet.ethAddr;
  const contract = await simple.fetchContract(abi, contractAddress);
  const userCount = await contract.userCount();
  if(userCount.toNumber() > 0) {
    var i;
    for (i = 1; i < userCount.toNumber() + 1; i++) {
      let user = await contract.users(i);
      console.log(user);
      if(user[1] === address) {
        setGlobal({ sectionsUnlocked: user[2].toNumber(), userId: user[0].toNumber() });
      }
    }
  } else {
    setGlobal({ sectionsUnlocked: 0 });
  }
  setGlobal({ contract });
}

export async function unlockNextSection(sectionsUnlocked) {
  const { simple, contractAddress, pageStates, userId } = getGlobal();
  const data = simple.getUserData();
  const account = data.wallet.ethAddr;
  const email = data.email;
  setGlobal({ uiState: pageStates.CODE_AUTH });
  if(sectionsUnlocked === 0) {
    //create the user than update the user with an unlocked section
    const params = {
      method: "createUser", 
      abi, 
      email, 
      value: account, 
      fromEmail: "hello@simpleid.xyz", 
      account, 
      address: contractAddress
    }
    const approval = await simple.createContractTransaction(params);
    console.log(approval);
  } else {
    //unlock another section
    const params = {
      method: "updateUser", 
      abi, 
      email, 
      value: [userId, account], 
      fromEmail: "hello@simpleid.xyz", 
      account, 
      address: contractAddress
    }
    const approval = await simple.createContractTransaction(params);
    console.log(approval);
  }
}

export async function approveTransaction(e) {
  e.preventDefault();
  const { simple, code } = getGlobal();

  const params = {
    email: simple.getUserData().email, 
    contractTx: true, 
    code
  }
  const transaction = await simple.broadcastTransaction(params);
  console.log(transaction);
  if(transaction.success) {
    pollForStatus(transaction.body.hash);
  } else {
    console.log("ERROR: ", transaction);
  }
}

export async function pollForStatus(tx) {
  const { simple, pageStates } = getGlobal();

  const status = await simple.pollForStatus(tx);
  console.log(status);
  if(status !== "Mined") {
    pollForStatus(tx);
  } else {
    setGlobal({ uiState: pageStates.SIGNED_IN });
    fetchContract();
  }
}
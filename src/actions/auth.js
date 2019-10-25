import { setGlobal, getGlobal } from 'reactn';

export async function handleSignUp(e) {
  e.preventDefault();
  const { pageStates, simple, email } = getGlobal();
  const credObj = {
    // id: document.getElementById('username-input-sign-up').value,
    // password: document.getElementById('password-input-sign-up').value,
    email: email,
    hubUrl: "https://hub.blockstack.org"
  }

  // Error check
  let error = false
  if (!credObj.email) {
    console.log('TODO: error report - no email found / specified.')
    error = true
  }
  if (error) {
    return
  }

  setGlobal({ uiState: pageStates.PENDING });

  // const options = {
  //    statusCallbackFn: this.statusCallbackFn,
  //    passwordless: true
  // }
  const payload = { email: credObj.email};
  const signup = await simple.authenticate(payload);
  if(signup.message === "name taken") {
    setGlobal({ uiState: pageStates.SIGN_IN_UP });
    //TODO: show growl
    console.log('trouble signing up')
  } else if (signup.message === "Approval email sent") {
    setGlobal({ uiState: pageStates.CODE_AUTH });
  } else {
    if(signup.message === "user session created") {
      setGlobal({ uiState: pageStates.SIGNED_IN, userSession: signup.body });
    } else {
      setGlobal({ uiState: pageStates.SIGN_IN_UP });
      //TODO: show growl
      console.log('trouble signing up')
    }
  }
}

export async function handleLoginWithCode(e) {
  e.preventDefault();
  const { pageStates, simple, email, code } = getGlobal();
  const payload = {
    email,
    token: code,
  };
  setGlobal({ uiState: pageStates.PENDING });
  const signup = await simple.authenticate(payload);
  if (signup.message === 'user session created') {
    const bstackSession = simple.getBlockstackSession()
    const userData = simple.getUserData()
    console.log('userData:')
    console.log(userData)
    const provider = simple.simpleWeb3().getDefaultProvider('ropsten');
    const address = simple.getUserData().wallet.ethAddr;
    setGlobal({ address });

    const balance = await provider.getBalance(address);
    const etherBal = simple.simpleWeb3().utils.formatEther(balance);
    setGlobal({ uiState: pageStates.SIGNED_IN, userSession: bstackSession, balance: etherBal });
  }
}
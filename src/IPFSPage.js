import React from 'react';
//import { pinContent, fetchPinnedContent } from 'simpleid-js-sdk';
import { simpleIDKeys } from './keys';

const GROWL_DISPLAY_STYLE = 'flex'

export default class IPFSPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      ipfsHash: ''
    }
  }

  saveContent = async (e) => {
    e.preventDefault();
    // document.getElementById('ipfs-hash').innerText = "";
    this.setState({ipfsHash: ''})
    const { userSession } = this.props;
    const content = document.getElementById('content-input').value;
    const title = document.getElementById('title-input').value;
    const id = "some-sort-of-id";
    const contentToPin = {
      id,
      title,
      content
    }
    const params = {
      devId: simpleIDKeys().devId,
      username: userSession.loadUserData().username,
      id: title,
      content: contentToPin, //the content we discussed previously
      apiKey: simpleIDKeys().apiKey
    }
    document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
    document.getElementById('growl-p').innerText = "Adding content to IPFS...";
    if(title && content) {
      const pinnedContent = {}//await pinContent(params);
      if(pinnedContent) {
        console.log(pinnedContent);
        document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
        document.getElementById('growl-p').innerText = "Content added to IPFS!";
        // document.getElementById('ipfs-hash').innerText = `IPFS hash: ${pinnedContent.body}`;
        this.setState({ipfsHash: pinnedContent.body})
        setTimeout(() => {
          document.getElementById('growl').style.display = "none";
          document.getElementById('growl-p').innerText = "";
        }, 2000)
      }
    }
  }

  fetchContent = async(e) => {
    e.preventDefault();
    // document.getElementById('ipfs-hash').innerText = "";
    // this.setState({ipfsHash: ''})
    const { userSession } = this.props;
    const title = document.getElementById('title-input').value;
    const params = {
      devId: simpleIDKeys().devId,
      username: userSession.loadUserData().username,
      id: title,
      apiKey: simpleIDKeys().apiKey
    }
    document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
    document.getElementById('growl-p').innerText = "Fetching content from IPFS...";
    const fetchedContent = {}//await fetchPinnedContent(params);
    if(fetchedContent) {
      console.log(fetchedContent);
      document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
      document.getElementById('growl-p').innerText = "File fetched from IPFS!";
      this.setState({ content: JSON.parse(fetchedContent.body).content });
      setTimeout(() => {
        document.getElementById('growl').style.display = "none";
        document.getElementById('growl-p').innerText = "";
      }, 2000)
    }
  }

  render() {
    const { userSession } = this.props;
    const { content, ipfsHash } = this.state;

    const ipfsHashElement = ipfsHash ?
      ( <div className='result-text-scroll-x'>
          File stored at IPFS Hash:
          <p style={{color: "#809eff"}}>{ipfsHash}</p>
        </div> ) : undefined

    const contentElement = content ?
      ( <div className='result-text-scroll-x'>
          This data:
          <p style={{color: "#809eff"}}>"{content}"</p>
          was fetched from the file at IPFS Hash:
          <p style={{color: "#809eff"}}>{ipfsHash}</p>

        </div> ) : undefined

    return (
      <form style={{textAlign:'left', overflowX:'hidden', width:'100%'}} className="form">

        <h2 style={{color: "#809eff"}}>Write a file to IPFS and pin it with Pinata, then read it back in this demo:</h2>

        <h3 className='instruction-text'>1. Choose a file name:</h3>
        <input placeholder="file name" type="text" id="title-input" />

        <h3 className='instruction-text'>2. Enter some text to store in your file:</h3>
        <input placeholder="file content" type="text" id="content-input" />

        <h3 className='instruction-text'>3. Click to store your file on IPFS:</h3>
        <button className="center-form-button on-white" onClick={this.saveContent}>Store File</button>
        {ipfsHashElement}

        <h3 className='instruction-text'>4. Click to fetch your file from IPFS:</h3>
        <button className="center-form-button on-white" onClick={this.fetchContent}>Fetch File</button>
        {contentElement}

      </form>
    )
  }
}

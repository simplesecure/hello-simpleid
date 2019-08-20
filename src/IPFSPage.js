import React from 'react';
import { pinContent, fetchPinnedContent } from 'simpleid-js-sdk';
import { simpleIDKeys } from './keys';

export default class IPFSPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    }
  }
  saveContent = async (e) => {
    e.preventDefault();
    document.getElementById('ipfs-hash').innerText = "";
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
    document.getElementById('growl').style.display = "block";
    document.getElementById('growl-p').innerText = "Adding content to IPFS...";
    if(title && content) {
      const pinnedContent = await pinContent(params);
      if(pinnedContent) {
        console.log(pinnedContent);
        document.getElementById('growl').style.display = "block";
        document.getElementById('growl-p').innerText = "Content added to IPFS!";
        document.getElementById('ipfs-hash').innerText = `IPFS hash: ${pinnedContent.body}`;
        setTimeout(() => {
          document.getElementById('growl').style.display = "none";
          document.getElementById('growl-p').innerText = "";
        }, 2000)
      }
    }
  }

  fetchContent = async(e) => {
    e.preventDefault();
    document.getElementById('ipfs-hash').innerText = "";
    const { userSession } = this.props;
    const title = document.getElementById('title-input').value;
    const params = {
      devId: simpleIDKeys().devId,
      username: userSession.loadUserData().username, 
      id: title,
      apiKey: simpleIDKeys().apiKey
    }
    document.getElementById('growl').style.display = "block";
    document.getElementById('growl-p').innerText = "Fetching content from IPFS...";
    const fetchedContent = await fetchPinnedContent(params);
    if(fetchedContent) {
      console.log(fetchedContent);
      document.getElementById('growl').style.display = "block";
      document.getElementById('growl-p').innerText = "File added to IPFS!";
      this.setState({ content: JSON.parse(fetchedContent.body).content });
      setTimeout(() => {
        document.getElementById('growl').style.display = "none";
        document.getElementById('growl-p').innerText = "";
      }, 2000)
    }
  }
  render() {
    const { userSession } = this.props;
    const { content } = this.state;
    return (
      <div>
        <form className="form">
          <button style={{marginBottom: "25px"}} className="on-white" onClick={this.props.signOut}>Sign Out</button>
          <h1 style={{marginBottom: "15px", color: "#809eff"}}>Hello, {userSession.loadUserData().username}</h1>
          <h2 style={{marginBottom: "35px", color: "#809eff"}}>Test adding some content to IPFS and pinning it with Pinata</h2>
          <input placeholder="my_new_file" type="text" id="title-input" />
          <label style={{color: "#809eff"}}>Content title</label>
          <br/>
          <input placeholder="test content here" style={{marginTop: "20px"}} type="text" id="content-input" />
          <label style={{color: "#809eff"}}>Content to save</label>
          <br/>
          <button className="on-white" style={{marginTop: "15px"}} onClick={this.saveContent}>Store content</button>
          <div>
            <p style={{color: "#809eff"}} id="ipfs-hash"></p>
          </div>
          <br/>
          <button className="on-white" style={{marginTop: "15px"}} onClick={this.fetchContent}>Fetch content</button>
          
        </form>
        <div style={{marginTop: "20px"}}>
          <h3 style={{color: "#809eff"}}>Your stored content will appear below when fetched</h3>
          <div style={{marginTop: "20px"}}>
            <h1 style={{color: "#809eff"}}>{content}</h1>
          </div>
        </div>
      </div>
    )
  }
}
import React from 'react';

export default class PinataPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    }
  }
  
  render() {
    const { userSession } = this.props;
    const { result, content } = this.state;
    return (
      <div>
        <form className="form">
          <button style={{marginBottom: "25px"}} className="button" onClick={this.props.signOut}>Sign Out</button>
          <h1 style={{marginBottom: "15px"}}>Hello, {userSession.loadUserData().username}</h1>
          <h2 style={{marginBottom: "35px"}}>Test deploying and fetching/executing a smart contract on Ethereum</h2>
          <textarea disabled value="hi"></textarea>
          <label>Sample Contract</label>
          <br/>
          <input placeholder="test content here" style={{marginTop: "20px"}} type="text" id="content-input" />
          <label>Content to save</label>
          <br/>
          <button style={{marginTop: "15px"}} onClick={this.saveContent}>Store content</button>
          <br/>
          <button style={{marginTop: "15px"}} onClick={this.fetchContent}>Fetch content</button>
          
        </form>
        <div style={{marginTop: "20px"}}>
          <h3>Your stored content will appear below when fetched</h3>
          <div style={{marginTop: "20px"}}>
            <h1>{content}</h1>
          </div>
        </div>
      </div>
    )
  }
}
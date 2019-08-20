import React from 'react';

export default class BlockstackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    }
  }
  saveContent = (e) => {
    e.preventDefault();
    const { userSession } = this.props;
    const content = document.getElementById('content-input').value;
    const title = document.getElementById('title-input').value;
    document.getElementById('growl').style.display = "block";
    document.getElementById('growl-p').innerText = "Saving file...";
    if(title && content) {
      userSession.putFile(`${title}.json`, content, {encrypt: false})
        .then((res) => {
          console.log(res);
          document.getElementById('growl').style.display = "block";
          document.getElementById('growl-p').innerText = "File saved!";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        }).catch((err) => {
          console.log(err)
          document.getElementById('growl').style.display = "block";
          document.getElementById('growl-p').innerText = "Trouble saving";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        });
    }
  }

  fetchContent = (e) => {
    e.preventDefault();
    document.getElementById('growl').style.display = "block";
    document.getElementById('growl-p').innerText = "Fetching content...";
    const { userSession } = this.props;
    const title = document.getElementById('title-input').value;
    if(title) {
      userSession.getFile(`${title}.json`, {decrypt: false})
        .then((res) => {
          this.setState({ content: res });
          if(res) {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          } else {
            document.getElementById('growl').style.display = "block";
            document.getElementById('growl-p').innerText = "No file found";
            setTimeout(() => {
              document.getElementById('growl').style.display = "none";
              document.getElementById('growl-p').innerText = "";
            }, 2000)
          }
        }).catch((err) => {
          console.log(err);
          document.getElementById('growl').style.display = "block";
          document.getElementById('growl-p').innerText = "Trouble saving";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        })
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
          <h2 style={{marginBottom: "35px", color: "#809eff"}}>Test storing some content with Blockstack's Gaia Storage</h2>
          <input placeholder="my_new_file" type="text" id="title-input" />
          <label style={{color: "#809eff"}}>File name</label>
          <br/>
          <input placeholder="test content here" style={{marginTop: "20px"}} type="text" id="content-input" />
          <label style={{color: "#809eff"}}>Content to save</label>
          <br/>
          <button className="on-white" style={{marginTop: "15px"}} onClick={this.saveContent}>Store content</button>
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
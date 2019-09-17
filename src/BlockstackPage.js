import React from 'react';

const GROWL_DISPLAY_STYLE = 'flex'

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
    document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
    document.getElementById('growl-p').innerText = "Saving file...";
    if(title && content) {
      userSession.putFile(`${title}.json`, content, {encrypt: false})
        .then((res) => {
          console.log(res);
          document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
          document.getElementById('growl-p').innerText = "File saved!";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        }).catch((err) => {
          console.log(err)
          document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
          document.getElementById('growl-p').innerText = "Trouble saving!";
          setTimeout(() => {
            document.getElementById('growl').style.display = "none";
            document.getElementById('growl-p').innerText = "";
          }, 2000)
        });
    }
  }

  fetchContent = (e) => {
    e.preventDefault();
    document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
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
            document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
            document.getElementById('growl-p').innerText = "No file found!";
            setTimeout(() => {
              document.getElementById('growl').style.display = "none";
              document.getElementById('growl-p').innerText = "";
            }, 2000)
          }
        }).catch((err) => {
          console.log(err);
          document.getElementById('growl').style.display = GROWL_DISPLAY_STYLE;
          document.getElementById('growl-p').innerText = "Trouble fetching!";
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

    const contentElement = content ?
      ( <div className='result-text-scroll-x'>
          This data:
          <p style={{color: "#809eff"}}>"{content}"</p>
          was fetched from your file on Blockstack Gaia.
        </div> ) : undefined

    return (
      <form style={{textAlign:'left', overflowX:'hidden', width:'100%'}} className="form">

        <h2 style={{color: "#809eff"}}>Write and read a file from Blockstack's Gaia Storage in this demo:</h2>

        <h3 className='instruction-text'>1. Choose a file name:</h3>
        <input placeholder="file name" type="text" id="title-input" />

        <h3 className='instruction-text'>2. Enter some text to store in your file:</h3>
        <input placeholder="file content" type="text" id="content-input" />

        <h3 className='instruction-text'>3. Click to store your file on Gaia:</h3>
        <button className="center-form-button on-white" onClick={this.saveContent}>Store File</button>

        <h3 className='instruction-text'>4. Click to fetch your file from Gaia:</h3>
        <button className="center-form-button on-white" onClick={this.fetchContent}>Fetch File</button>
        {contentElement}

      </form>
    )
  }
}

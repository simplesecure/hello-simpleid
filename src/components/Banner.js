import React from 'reactn';
import Button from 'react-bootstrap/Button';
import logo from '../white-logo.png';

export default class Banner extends React.Component {
  render() {
    const { simple } = this.global;
    const handlSignOutButton = simple.getBlockstackSession().isUserSignedIn() ?
      ( <Button variant="danger" size="md" onClick={() => simple.signOut()}>Sign Out</Button> ) :
      undefined
    return (
      <div className="banner">
        <div className="banner-content">
          <img className="banner-logo" src={logo} alt="Simple ID" />
          {handlSignOutButton}
        </div>
      </div>
    )
  }
}
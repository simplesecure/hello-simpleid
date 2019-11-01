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
      <div className="navbar-container bg-primary-3">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand navbar-brand-dynamic-color fade-page" href="https://simpleid.xyz">
              <img className="banner-logo" alt="SimpleID" src={logo} />
            </a>
            <div className="d-flex align-items-center order-lg-3">
              {handlSignOutButton}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
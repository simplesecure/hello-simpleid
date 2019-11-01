import React from 'reactn';

export default class SectionSeven extends React.Component {
  render() {
    return(
      <article id="section-seven">
       <p><strong>Authentication</strong></p>
       <p>
       Signing up for an account or signing into an existing account (combined, known as authentication) has long been a relatively solved issue for software applications. The username/password paradigm has been well-established. And while there have been problems with this paradigm, it’s a easy-to-understand process for end-users. Unfortunately, the Web 3.0 movement has asked users to learn 
       an entirely new paradigm without presenting the benefits of learning such a new concept up front. Rather than a username/password, Web 3.0 users have been asked to write down a 12- or 24-word phrase and keep it somewhere safe. This comes after years of security professionals telling web users not to write their passwords down. In addition, Web 3.0 users don’t simply authenticate into an 
       application from within the application itself. They are sent to a third-party that they may not be familiar with (eg. Metamask, Blockstack, Portis, etc). 
       </p>
       <p>
       SimpleID solves all of these issues and improves upon the authentication experience by letting developers build authentication directly into their applications. If enterprises and individual developers want to include SimpleID branding as a badge of trust, they can, but it is not required. SimpleID has also eliminated the need for passwords and enabled a secure, token-based authentication system. 
       How it works: 
       </p>
       <p>DIAGRAM HERE</p>
       <p>
       One-time-use codes are the backbone of this system. These codes are TOTP-standards <a href="#footnote-9">[9]</a> based and are compatible with hardware security keys (eg. Yubikey, Trezor, etc), authenticator applications (eg. Authy, Duo, Google Authenticator), email, and SMS. These codes offer an added level of security without burdening the end-user. Many enterprises are already familiar with these codes as they 
       have been a significant part of the multi-factor authentication movement in the business space. SimpleID takes that concept and applies it as the primary factor. That said, enterprises can add a second code generation, likely sent to a different device, to enable multi-factor authentication through SimpleID. 
       </p>
      </article>
    )
  }
}
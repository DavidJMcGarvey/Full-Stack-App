import React, { Component } from 'react';

export default class UserSignOut extends Component {
  render() {
    return (
      <div class="grid-33 centered signin">
      <h1>Sign Out</h1>
      <div>
        <h2>You've Signed Out Successfully! Proud of You :)</h2>
      </div>
      <p>&nbsp;</p>
      <p>Still don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
    </div>
    )
  }
}
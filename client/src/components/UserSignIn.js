import React, { Component } from 'react';


export default class UserSignIn extends Component {
  render() {
    return (
      <div class="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form>
            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/></div>
            <div><input id="password" name="password" type="password" className="" placeholder="Password" value=""/></div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
      </div>
    )
  }
}
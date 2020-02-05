import React, { Component } from 'react';

export default class UserSignUp extends Component {
  render() {
    return (
      <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value=""/></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value=""/></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value=""/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                  value=""/></div>
              <div class="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
        </div>
        
    )
  }
}
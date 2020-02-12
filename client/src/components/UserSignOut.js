// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// export default class UserSignOut extends Component {
//   render() {
//     const { context } = this.props;
//     context.authenticatedUser = null;
//     return (
//       <div className="grid-33 centered signin">
//       <h1>Sign Out</h1>
//       <div>
//         <h2>You've Signed Out Successfully!</h2>
//         <br/>
//         <h3>Proud of You :)</h3>
//       </div>
//       <p>&nbsp;</p>
//       <p>Still don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
//     </div>
//     )
//   }
// }

import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  context.actions.signOut();
  return (
    <Redirect to="/courses" />
  );
}
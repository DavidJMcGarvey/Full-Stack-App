import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticaedUser') || null
  }

  constructor() {
    super();
    this.data = new Data()
  }

  render() {
    const { authenticaedUser } = this.state;
    const value = {
      authenticaedUser,
      data: this.data,
      actions: {
        signin: this.signIn,
        signout: this.signOut,
        // getCourse: this.getCourse
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user != null) {
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState(() => { 
      return {
        authenticatedUser: null 
      };
    });
    Cookies.remove('authenticatedUser');
  }

  // async getCourse(id) {
  //   const res = await this.api(`/courses/${id}`, 'GET', null);
  //   if (res.status === 200) {
  //     return res.json()
  //       .then(resData => resData);
  //   } else if (res.status === 404) {
  //     return null;
  //   } else {
  //     throw new Error();
  //   }
  // }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}


